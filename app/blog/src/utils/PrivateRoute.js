import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import store from '../store';

/**
 * Redirects to login page for private routes if state logged is false
 */
export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    store.getState().user.logged ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)