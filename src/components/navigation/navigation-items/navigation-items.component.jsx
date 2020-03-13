import React from "react";

import NavigationItem from "./navigation-item/navigation-item.component";

import classes from "./navigation-items.module.css";

const navigationItems = props => {
  return (
    <ul className={classes.NavirationItems}>
      <NavigationItem exact link="/">Burger builder</NavigationItem>
      {props.isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null}

      {props.isAuth
        ? <NavigationItem link="/logout">Log out</NavigationItem>
        : <NavigationItem link="/auth">Log In</NavigationItem>
      }
    </ul>
  );
};

export default navigationItems;
