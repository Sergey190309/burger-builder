import React from "react";

import NavigationItem from "./navigation-item/navigation-item.component";

import classes from "./navigation-items.module.css";

const navigationItems = props => (
  <ul className={classes.NavirationItems}>
    <NavigationItem
      link="/"
      active
    >
      Burger builder
    </NavigationItem>
    <NavigationItem
      link="/"
    >
      Check out
    </NavigationItem>

  </ul>
);

export default navigationItems;
