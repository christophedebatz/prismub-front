import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { Route, Redirect } from "react-router";
import Home from './containers/Home';

import "sanitize.css/sanitize.css";

render(
  <BrowserRouter>
    <div>
      <Route path="/" exact component={Home} />
    </div>
  </BrowserRouter>,
  document.querySelector("#root")
);
