import React from 'react';

import classes from './Flight.css';

/*======================================================================
// This is responsible for displaying the details for a SpaceX
// Flight using the object passed in from the SpaceXFlights container.
======================================================================*/
const Flight = (props) => {

  return (
      <section className={classes.Flight}>
        <div className={[classes.Wrapper, classes.Clearfix].join(' ')}>
          <div className={classes.Col1of2}>
            <img className={classes.FlightPatch} src={props.flightInfo.flightMissionPatch} alt='SpaceX mission patch'></img>
          </div>
          <div className={classes.Col2of2}>
            <h2>Flight #{props.flightInfo.flightNumber}</h2>
            <hr />
            <p>{props.flightInfo.flightDetails}</p>
            <p><strong>Flight Year:</strong> {props.flightInfo.flightYear}</p>
            <p><strong>Rocket:</strong> {props.flightInfo.flightName}</p>
            <p><strong>Launch Site:</strong> {props.flightInfo.flightLaunchSite}</p>
            <p><strong>Telemetry:</strong> {props.flightInfo.flightTelemetry}</p>
            <iframe title="SpaceX Flight Video" width="560" height="315" src={props.flightInfo.flightVideoEmbed} frameBorder="0" allow="autoplay; encrypted-media"></iframe>
          </div>
        </div>
      </section> 
  );
}

export default Flight;