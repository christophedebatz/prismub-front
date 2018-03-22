import React from "react";
import "semantic-ui-css/semantic.min.css";
import { render } from "react-dom";
import { Route, Redirect } from "react-router";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import store, { history } from "./store";
import { Constants } from './config/constants';
import HomePage from "./containers/home/HomePage";
import TeamPage from './containers/misc/TeamPage';
import ContactPage from './containers/misc/ContactPage';
import PrinciplePage from './containers/misc/PrinciplePage';
import SignupPage from './containers/signup/SignupPage';
import About from "./containers/about/index";
import AuthHelper from './helpers/auth';

import "sanitize.css/sanitize.css";
import "./css/styles.global.css";

const protect = component => {
  const userJson = localStorage.getItem(Constants.LOCAL_STORAGE_AUTH);
  if (userJson) {
    const user = JSON.parse(userJson);
    if (!user.token || !AuthHelper.isLoggedIn(user)) {
      return ( <Redirect to="/" /> );
    } else {
      const $c = component; // non alpha first letter force jsx to take value first
      return ( <$c /> );
    }
  } else {
    return ( <Redirect to="/" /> );
  }
};

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route path="/" exact component={} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.querySelector("#root")
);
