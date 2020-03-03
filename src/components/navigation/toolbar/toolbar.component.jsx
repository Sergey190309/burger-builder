import React from "react";

import Logo from "../../logo/logo.component";
import NavigationItems from "../navigation-items/navigation-items.component";

import classes from "./toolbar.module.css";

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <div>Menu</div>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
