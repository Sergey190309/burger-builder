import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/order/checkout-summary/checkout-summary.component";
import ContactData from "./contact-data/contact-data.container";
// import * as actions from "../../store/actions/index";

// import classes from "./checkout.module.css";

class Checkout extends React.Component {
  onCheckoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  onCheckoutContinuedHandler = () => {

    this.props.history.replace( '/checkout/contact-data' );
  };


  render() {
    let summary = <Redirect to="/" />
    if (this.props.ings) {
      summary = (
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
      )
    }
    return summary;
  };
};

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
