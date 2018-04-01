import React from 'react';

import classes from './Flight.css';

/*======================================================================
// This is responsible for displaying the details for a SpaceX
// Flight using the object passed in from the SpaceXFlights container.
======================================================================*/
const Flight = (props) => {

  return (
      <div className={classes.Flight}>
          <ul>
            <li><img src={props.flightInfo.flightMissionPatch} alt='SpaceX mission patch'></img></li>
            <iframe title="SpaceX Flight Video" width="560" height="315" src={props.flightInfo.flightVideoEmbed} frameborder="0" allow="autoplay; encrypted-media"></iframe>
            <li>Flight #{props.flightInfo.flightNumber}</li>
            <li>{props.flightInfo.flightDetails}</li>
            <li>Rocket: {props.flightInfo.flightName}</li>
            <li>Launch Site: {props.flightInfo.flightLaunchSite}</li>
            <li>Telemetry: {props.flightInfo.flightTelemetry}</li>
          </ul>
      </div> 
  );
}

export default Flight;