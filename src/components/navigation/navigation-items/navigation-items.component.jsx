import React from "react";

import NavigationItem from "./navigation-item/navigation-item.component";

import classes from "./navigation-items.module.css";

const navigationItems = props => (
  <ul className={classes.NavirationItems}>
    <NavigationItem exact link="/">Burger builder</NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
  </ul>
);

export default navigationItems;
