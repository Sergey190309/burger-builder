import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

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
        {this.props.isAuth} ? <Redirect to="/" /> : null
        <Toolbar
          isAuth={this.props.isAuth}
          toggleSideDrawer={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuth}
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

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
