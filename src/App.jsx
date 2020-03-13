import React from 'react';
import { Route, Switch } from "react-router-dom";

import Layout from "./hoc/layout/layout.component";
import BurgerBuilder from "./containers/burger-builder/burger-builder.container";
import Checkout from "./containers/checkout/checkout.container";
import Orders from "./containers/orders/orders.container";
import Auth from "./containers/auth/auth.container";
import Logout from "./containers/auth/logout/logout.component";
// import classes from "./App.module.css"

class App extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route exact path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  };
};

export default App;
