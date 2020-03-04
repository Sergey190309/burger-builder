import React from "react";

import Aux from "../auxiliary/auxiliary";
import Toolbar from "../../components/navigation/toolbar/toolbar.component";
import SideDrawer from "../../components/navigation/side-drawer/side-drawer.component";

import classes from "./layout.module.css";

class Layout extends React.Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar toggleSideDrawer={this.sideDrawerToggleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closeSideDrawer={this.sideDrawerCloseHandler}
        />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

export default Layout;
