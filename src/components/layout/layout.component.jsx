import React from "react";

import Aux from "../../hoc/auxiliary";
import Toolbar from "../navigation/toolbar/toolbar.component";
import SideDrawer from "../navigation/side-drawer/side-drawer.component";

import classes from "./layout.module.css";

class Layout extends React.Component {
  state = {
    showSideDrawer: true
  }

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  render() {
    return (
      <Aux>
        <Toolbar />
        <SideDrawer
          open={this.state.showSideDrawer}
          close={this.sideDrawerCloseHandler}
        />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

export default Layout;
