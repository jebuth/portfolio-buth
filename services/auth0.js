import auth0 from 'auth0-js';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';

class Auth0 {

  constructor(){
    this.auth0 = new auth0.WebAuth({
    domain: 'course1.auth0.com',
    clientID: 'VML0pyBoAB7uRtrX0d2amPTZS8kghbP8',
    redirectUri: 'http://localhost:3000/callback',
    responseType: 'token id_token',
    scope: 'openid profile'
  });

    // bind the context of login function to this class.
    // login() is called from Login component in Header which uses a different context.
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    //this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  handleAuthentication() {

    return new Promise((resolve, reject) => {
        this.auth0.parseHash((err, authResult) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
            this.setSession(authResult);
            resolve();

          } else if (err) {
            reject();
            console.log('auth0.js handleAuthentication() error');
          }
      });
    })
  }

  setSession(authResult) {

    // console.log('setSession \nuser:      ' + authResult.idTokenPlayload + 
    //                        '\njwt:       ' + authResult.idToken +
    //                        '\nexpires-at ' + authResult.expiresAt + '\n');


    debugger;
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    
    Cookies.set('user', authResult.idTokenPlayload);
    Cookies.set('jwt', authResult.idToken);
    Cookies.set('expires-at', expiresAt);


  }

  login() {
    //console.log('login()');
    this.auth0.authorize();
  }

  logout(){
    //console.log('logout()');
    Cookies.remove('user');
    Cookies.remove('jwt');
    Cookies.remove('expires-at');

    this.auth0.logout({
      returnTo: '',
      clientID: 'VML0pyBoAB7uRtrX0d2amPTZS8kghbP8'
    })

  }

  // isAuthenticated() {
  //   const expiresAt = Cookies.getJSON('expires-at');
  //   console.log(new Date().getTime() < expiresAt);
  //   return new Date().getTime() < expiresAt;
  // }

  // get set of public keys we can use to verify token
  async getJWKS(){
    //console.log('getJWKS()');
    const res = await axios.get('https://course1.auth0.com/.well-known/jwks.json');
    const jwks = res.data;
    return jwks;
  }

  async verifyToken(token){
    console.log('verifyToken()');

    if(token){
      // complete: true will give us the header of a jwt as well
      const decodedToken = jwt.decode(token, {complete: true});

      if(!decodedToken){return undefined};

      const jwks = await this.getJWKS();

      console.log(jwks);  

      const jwk = jwks.keys[0]; 
      // build certificate
      let cert = jwk.x5c[0];
      cert = cert.match(/.{1,64}/g).join('\n');
      cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;
      //

      if(jwk.kid === decodedToken.header.kid){
        try{
          const verifiedToken = jwt.verify(token, cert);
          const expiresAt = verifiedToken.exp * 1000;

          return (verifiedToken && new Date().getTime() < expiresAt) ? verifiedToken : undefined;
        } catch(err){
          return undefined;
        }
      }
    }
    return undefined;
  }

  async clientAuth(){
    //console.log('clientAuth()');

    const token = Cookies.getJSON('jwt');
    const verifiedToken = await this.verifyToken(token);

    return verifiedToken;
    
  }

  async serverAuth(req){

    //console.log('serverAuth()');
    //console.log('auth0.js serverAuth');
    if(req.headers.cookie){

      const tokenCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='));

      if(!tokenCookie){return undefined};
      const token = tokenCookie.split('=')[1];
      const verifiedToken = await this.verifyToken(token);

      console.log('serverAuth ' + verifiedToken);
      return verifiedToken;
    }

    return undefined;
  }
}

const auth0Client = new Auth0();

export default auth0Client;



































