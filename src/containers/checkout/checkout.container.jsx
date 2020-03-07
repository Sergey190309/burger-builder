import React from "react";

import CheckoutSummary from "../../components/order/checkout-summary/checkout-summary.component";

// import classes from "./checkout.module.css";

class Checkout extends React.Component {
  state = {
    ingredients: {
      bacon: 1,
      cheese: 1,
      meat: 1,
      salad: 1
    }
  };
  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} />
      </div>
    );
  };
};

export default Checkout;
