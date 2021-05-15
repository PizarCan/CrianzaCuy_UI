import React, { useState, useEffect } from "react";
import { Switch, Route, Link, Redirect, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import 'font-awesome/css/font-awesome.min.css';
import "./App.css";

import "perfect-scrollbar/css/perfect-scrollbar.css";
import "./assets/scss/paper-dashboard.scss?v=1.2.0";
import "./assets/css/demo.css";

import './assets/css/custom.css'
import './assets/css/normilize.css'
import './assets/css/prog-tracker.css'

import Login from "./views/Login";
import Register from "./views/Register";
import AdminLayout from "./layouts/Admin.js";

import Login1 from './components/Login';

import PrivateRoute from './components/PrivateRoute'

const App = () => {

  let history = useHistory();

  useEffect(() => {

  }, []);

  return (
    <Switch>
          <PrivateRoute path='/admin' component={AdminLayout} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/login1" component={Login1} />
          <Route exact path="/register" component={Register} />
    </Switch>
  );
};

export default App;