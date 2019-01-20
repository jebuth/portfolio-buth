import React from 'react';
import App, { Container } from 'next/app';
import auth0 from '../services/auth0';

// stylings
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.scss';

export default class MyApp extends App {

  // function initiated on server and client for every page
  static async getInitialProps({ Component, router, ctx }) {
    
    let pageProps = {}

    // check which environment and execute function accordingly
    const user = process.browser ? await auth0.clientAuth() : await auth0.serverAuth(ctx.req);

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    let isAuthenticated = false;
    // if user is not undefined, isAuthenticated will evaluate to true
    const auth = {user, isAuthenticated: !!user };

    return { pageProps ,auth}
  }

  render () {
    const { Component, pageProps, auth } = this.props

    return (
      <Container>
        <Component {...pageProps} auth={auth} />
      </Container>
    )
  }
}  



