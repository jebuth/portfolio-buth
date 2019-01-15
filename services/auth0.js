import auth0 from 'auth0-js';

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
  }

  login() {
    this.auth0.authorize();
  }
}

const auth0Client = new Auth0();

export default auth0Client;