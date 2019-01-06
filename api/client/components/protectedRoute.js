import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import Provider, {MyContext} from './provider'

var lObject = localStorage.getItem('lObject')
var lObjectJSON = JSON.parse(lObject)
var admin

{(lObjectJSON) ? (admin = lObjectJSON.admin) : (admin = false)}

const ProtectedRoute = ({ component: Component, ...rest }) => (

    <MyContext.Consumer>
    {({ isToken }) => (
        <Route {...rest}
        render={
          props =>
            (admin) ? <Component {...props} /> : <Redirect to="/DashboardNotFound" />
        }
        {...rest}
      />
    )}
    </MyContext.Consumer>
);

export default ProtectedRoute;