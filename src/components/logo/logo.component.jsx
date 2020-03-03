import React from "react";

import burgerLogo from "../../assets/images/burger-logo.png";
import classes from "./logo.module.css";

const logo = (props) => (
  <div className={classes.Logo} style={{height: props.height}}>
    <img src={burgerLogo} alt="It should be logo here" />
  </div>
);

export default logo;
