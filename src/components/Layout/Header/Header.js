import React from 'react';

import classes from './Header.css';

/*======================================================================
// This is the header for the app.
======================================================================*/
const Header = (props) => (
  <div className={classes.Header}>
    <div className={classes.HeaderName}>
      <h1>SpaceX Flights</h1>
    </div>
  </div>
)

export default Header;