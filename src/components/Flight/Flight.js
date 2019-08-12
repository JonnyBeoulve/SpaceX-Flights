import React from "react";
import classes from "./Flight.css";

/*======================================================================
// This is responsible for displaying the details for a SpaceX
// Flight using the object passed in from the SpaceXFlights container.
======================================================================*/
const Flight = ({ flight }) => {
  const flightVideoEmbed = `https://www.youtube.com/embed/${flight.links.video_link.slice(
    -11
  )}`;
  const flightTelemetry = flight.telemetry.flight_club
    ? flight.telemetry.flight_club
    : "https://www.flightclub.io";
  const flightOutcome = flight.launch_success
    ? "Mission Successful"
    : "Mission Failed";

  return (
    <div className={[classes.Wrapper, classes.Clearfix].join(" ")}>
      <div className={classes.Col1of2}>
        <img
          className={classes.FlightPatch}
          src={flight.links.mission_patch}
          alt="SpaceX Mission Patch"
        />
      </div>
      <div className={classes.Col2of2}>
        <h2>Flight #{flight.flight_number}</h2>
        <hr />
        <p>{flight.details}</p>
        <p>
          {flight.launch_year}{" "}
          <span className={classes.Subtitle}>Flight Year</span>{" "}
        </p>
        <p>
          {flight.rocket.rocket_name}{" "}
          <span className={classes.Subtitle}>Rocket</span>
        </p>
        <p>
          {flight.launch_site.site_name_long}{" "}
          <span className={classes.Subtitle}>Launch Site</span>
        </p>
        <p>
          {flightOutcome} <span className={classes.Subtitle}>Outcome</span>
        </p>
        <div className={classes.Links}>
          <a href={flightTelemetry} target="_blank" className={classes.Link}>
            TELEMETRY
          </a>
          <a
            href={flight.links.article_link}
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
          src={flightVideoEmbed}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default Flight;
