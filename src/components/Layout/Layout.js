import React from "react";

import Auxiliary from "../../hoc/Auxiliary";
import classes from "./Layout.css";

const layout = props => (
  <Auxiliary>
    <main className={classes.Content}>{props.children}</main>
  </Auxiliary>
);

export default layout;
