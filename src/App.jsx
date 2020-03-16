import React from 'react';
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import asyncLoading from "./hoc/async-loading/async-loading";

import Layout from "./hoc/layout/layout.component";
import BurgerBuilder from "./containers/burger-builder/burger-builder.container";
// import Checkout from "./containers/checkout/checkout.container";
// import Orders from "./containers/orders/orders.container";
// import Auth from "./containers/auth/auth.container";
import Logout from "./containers/auth/logout/logout.component";
import * as actions from "./store/actions/index";
// import classes from "./App.module.css"

const asyncCheckout = asyncLoading(() => {
  return import("./containers/checkout/checkout.container")
});

const asyncOrders = asyncLoading(() => {
  return import("./containers/orders/orders.container")
});

const asyncAuth = asyncLoading(() => {
  return import("./containers/auth/auth.container")
});

class App extends React.Component {
  componentDidMount() {
    this.props.onTryAutoSignUp();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route exact path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route exact path="/" component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
