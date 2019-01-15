import auth0 from 'auth0-js';
import Cookies from 'js-cookie';

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

    this.handleAuthentication = this.handleAuthentication.bind(this);
  }

  handleAuthentication() {

    return new Promise((resolve, reject) => {
        this.auth0.parseHash((err, authResult) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
            this.setSession(authResult);
            resolve();

          } else if (err) {
            reject();
            console.log(err);
          }
      });
    })
  }

  setSession(authResult) {

    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    
    Cookies.set('user', authResult.idTokenPlayload);
    Cookies.set('jwt', authResult.idToken);
    Cookies.set('expires-at', expiresAt);


  }

  login() {
    this.auth0.authorize();
  }
}

const auth0Client = new Auth0();

export default auth0Client;