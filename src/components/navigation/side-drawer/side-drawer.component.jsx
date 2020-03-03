import React from "react";

import Logo from "../../logo/logo.component";
import NavigationItems from "../navigation-items/navigation-items.component";
import Backdrop from "../../UI/backdrop/backdrop.component";
import Aux from "../../../hoc/auxiliary";

import classes from "./side-drawer.module.css";

const sideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <Backdrop
        show={props.open}
        clicked={props.close}
      />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
