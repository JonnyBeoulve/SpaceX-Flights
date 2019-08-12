import React from "react";
import classes from "./Footer.css";

/*======================================================================
// This is the footer for the app.
======================================================================*/
const Header = props => (
  <footer className={classes.Footer}>
    <p>
      Made by{" "}
      <a
        href="http://www.jonathanleack.com/"
        target="_blank"
        rel="noopener noreferrer"
        alt="Jonathan Leack portfolio"
      >
        Jonathan Leack
      </a>
      .
    </p>
  </footer>
);

export default Header;
