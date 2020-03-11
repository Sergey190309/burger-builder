import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/order/checkout-summary/checkout-summary.component";
import ContactData from "./contact-data/contact-data.container";

// import classes from "./checkout.module.css";

class Checkout extends React.Component {
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
          ingredients={this.props.ings}
          onCheckoutContinued={this.onCheckoutContinuedHandler}
          onCheckoutCancelled={this.onCheckoutCancelledHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    ings: state.ingredients
  };
};

export default connect(mapStateToProps)(Checkout);
