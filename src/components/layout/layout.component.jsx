import React from "react";

import Auxiliary from "../../hoc/auxiliary";

import classes from "./layout.module.css";
// import classes from "./layout.styles.module.css";

const layout = (props) => (
  <Auxiliary>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={classes.Content}>
      {props.children}
    </main>
  </Auxiliary>
);

export default layout;
