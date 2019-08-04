import React from "react";

import classes from "./Flight.css";

/*======================================================================
// This is responsible for displaying the details for a SpaceX
// Flight using the object passed in from the SpaceXFlights container.
======================================================================*/
const Flight = props => {
  return (
    <div className={[classes.Wrapper, classes.Clearfix].join(" ")}>
      <div className={classes.Col1of2}>
        <img
          className={classes.FlightPatch}
          src={props.flightInfo.flightMissionPatch}
          alt="SpaceX Mission Patch"
        />
      </div>
      <div className={classes.Col2of2}>
        <h2>Flight #{props.flightInfo.flightNumber}</h2>
        <hr />
        <p>{props.flightInfo.flightDetails}</p>
        <p>
          {props.flightInfo.flightYear}{" "}
          <span className={classes.Subtitle}>Flight Year</span>{" "}
        </p>
        <p>
          {props.flightInfo.flightName}{" "}
          <span className={classes.Subtitle}>Rocket</span>
        </p>
        <p>
          {props.flightInfo.flightLaunchSite}{" "}
          <span className={classes.Subtitle}>Launch Site</span>
        </p>
        <p>
          {props.flightInfo.flightSuccess}{" "}
          <span className={classes.Subtitle}>Outcome</span>
        </p>
        <div className={classes.Links}>
          <a
            href={props.flightInfo.flightTelemetry}
            target="_blank"
            className={classes.Link}
          >
            TELEMETRY
          </a>
          <a
            href={props.flightInfo.flightArticle}
            target="_blank"
            className={classes.Link}
          >
            READ MORE
          </a>
        </div>
        <iframe
          title="SpaceX Flight Video"
          width="100%"
          height="360px"
          src={props.flightInfo.flightVideoEmbed}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default Flight;
