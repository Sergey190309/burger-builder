import React from "react";

import Aux from "../../../hoc/auxiliary/auxiliary";
import Button from "../../UI/button/button.component";

class OrderSummary extends React.Component {
  // This could be finctional component.

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>
          : {this.props.ingredients[igKey]}
        </li>
      );
    });

    return (
      <Aux>
        <h3>Your order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total price: USD {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to check out?</p>
        <Button
          clicked={this.props.purchaseContinued }
          btnType="Success"
        >Continue</Button>
        <Button
          clicked={this.props.purchaseCancelled}
          btnType="Danger"
        >Cancel</Button>
      </Aux>
    );
  }
}

export default OrderSummary;
