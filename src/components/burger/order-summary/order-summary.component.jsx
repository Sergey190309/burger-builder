import React from "react";

import Aux from "../../../hoc/auxiliary";
import Button from "../../UI/button/button.component";

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span>
          : {props.ingredients[igKey]}
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
      <p><strong>Total price: USD {props.price.toFixed(2)}</strong></p>
      <p>Continue to check out?</p>
      <Button
        clicked={props.purchaseContinue }
        btnType="Success"
      >Continue</Button>
      <Button
        clicked={props.purchaseCancel}
        btnType="Danger"
      >Cancel</Button>
    </Aux>
  );
};

export default orderSummary;
