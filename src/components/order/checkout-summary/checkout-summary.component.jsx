import React from "react";

import Burger from "../../burger/burger.component";
import Button from "../../UI/button/button.component";

import classes from "./checkout-summary.module.css";

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{width: "100%", margin: "auto"}}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button
        btnType="Success"
        clicked
        >Contunue</Button>
      <Button
        btnType="Danger"
        clicked
        >Cancel</Button>
    </div>
  );
};

export default checkoutSummary;
