import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { Route, Redirect } from "react-router";
import Home from './containers/Home';
import Metric from './containers/Metric';
import '/css/styles.css';
import "/sanitize.css/sanitize.css";

render(
  <BrowserRouter>
    <div>
      <Route path="/" exact render={props => <Home {...props} />} />
      <Route path="/metrics/:key" component={Metric} />
    </div>
  </BrowserRouter>,
  document.querySelector("#root")
);
