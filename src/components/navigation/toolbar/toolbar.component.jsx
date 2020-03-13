import React from "react";

import Logo from "../../logo/logo.component";
import NavigationItems from "../navigation-items/navigation-items.component";
import MenuButton from "../side-drawer/menu-botton/menu-botton.component";

import classes from "./toolbar.module.css";

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <nav className={classes.MobileOnly}>
      <MenuButton clicked={props.toggleSideDrawer} />
    </nav>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuth={props.isAuth} />
    </nav>
  </header>
);

export default toolbar;
