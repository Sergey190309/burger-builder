import React from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/order/checkout-summary/checkout-summary.component";
import ContactData from "./contact-data/contact-data.container";

// import classes from "./checkout.module.css";

class Checkout extends React.Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };

  componentWillMount() {
    // console.log("checkout contaiern propws", this.props);
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = +param[1];
      } else {
        ingredients[param[0].split(' ')[0]] = +param[0].split(' ')[1];
      };
    };
    this.setState({ ingredients: ingredients, totalPrice: price });
  };

  onCheckoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  onCheckoutCancelledHandler = () => {
    // console.log("Checkout container", this.props.history);
    this.props.history.goBack();

  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          onCheckoutContinued={this.onCheckoutContinuedHandler}
          onCheckoutCancelled={this.onCheckoutCancelledHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          // component={ContactData}
          render={(props) => <ContactData
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            {...props}
          />}
        />
      </div>
    );
  };
};

export default Checkout;
