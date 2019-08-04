import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";

import Auxiliary from "../../hoc/Auxiliary";
import classes from "./SpaceXFlights.css";
import Flight from "../../components/Flight/Flight";
import Footer from "../../components/Layout/Footer/Footer";
import Header from "../../components/Layout/Header/Header";
import { ALL_FLIGHTS } from "../../store/store";

/*======================================================================
// This container will request information for a specific SpaceX Flight
// from the company's official API before passing that information
// down to a component to display to the user.
======================================================================*/
class SpaceXFlights extends Component {
  /*======================================================================
    // This will house the main states of the program, namely the
    // object obtained from the SpaceX API GET request.
    ======================================================================*/
  constructor() {
    super();
    this.state = {
      flightInformation: {
        flightNumber: null,
        flightName: null,
        flightYear: null,
        flightDetails: null,
        flightLaunchSite: null,
        flightMissionPatch: null,
        flightVideoEmbed: null,
        flightTelemetry: null,
        flightArticle: null,
        flightSuccess: null
      },
      loading: true,
      selectedFlight: 73
    };
  }

  /*====================================================================== 
    // Upon this container being mounted, a call to the SpaceX API will 
    // be made.
    ======================================================================*/
  componentDidMount() {
    this.getInformation(this.state.selectedFlight);
  }

  /*====================================================================== 
    // When a user selects an option from the dropdown, a GET request
    // will be made for the corresponding flight number.
    ======================================================================*/
  selectFlight = selectedNum => {
    this.getInformation(selectedNum);
    this.setState({
      selectedFlight: selectedNum
    });
  };

  /*======================================================================
    // This will send a GET request to the SpaceX API to obtain details
    // for a particular flight. Video links will be altered into an
    // embeddable code. Telemetry will be set to the FlightClub homepage
    // if no build is provided. This will also add a period to the end of
    // the description if it's missing one (common).
    ======================================================================*/
  getInformation = query => {
    this.setState({
      loading: true
    });
    axios
      .get(`https://api.spacexdata.com/v2/launches?flight_number=${query}`)

      .then(res => {
        let videoLink = res.data[0].links.video_link;
        let videoEmbed = videoLink.slice(-11);
        videoEmbed = videoEmbed.replace(/^/, "https://www.youtube.com/embed/");

        let telemetry;
        if (res.data[0].telemetry.flight_club === null) {
          telemetry = "https://www.flightclub.io";
        } else {
          telemetry = res.data[0].telemetry.flight_club;
        }

        let outcome;
        if (res.data[0].launch_success === true) {
          outcome = "Mission Successful";
        } else {
          outcome = "Mission Failed";
        }

        let detail = res.data[0].details;
        detail = detail.slice(-1);
        if (detail !== ".") {
          detail = res.data[0].details + ".";
        } else {
          detail = res.data[0].details;
        }

        this.setState({
          flightInformation: {
            flightNumber: res.data[0].flight_number,
            flightName: res.data[0].rocket.rocket_name,
            flightYear: res.data[0].launch_year,
            flightDetails: detail,
            flightLaunchSite: res.data[0].launch_site.site_name_long,
            flightMissionPatch: res.data[0].links.mission_patch,
            flightVideoEmbed: videoEmbed,
            flightTelemetry: telemetry,
            flightArticle: res.data[0].links.article_link,
            flightSuccess: outcome
          },
          loading: false
        });
      })
      .catch(err => {
        this.setState({
          loading: false
        });
        console.log("Error fetching and parsing data.", err);
      });
  };

  render() {
    return (
      <Auxiliary>
        <div>
          <Header />
          <Select
            simpleValue
            className={classes.Select}
            onChange={this.selectFlight}
            options={ALL_FLIGHTS}
            value={this.state.selectedFlight}
          />
          <article className={classes.Flight}>
            {this.state.loading ? (
              <div className={classes.Loader} />
            ) : (
              <Flight flightInfo={this.state.flightInformation} />
            )}
          </article>
          <Footer />
        </div>
      </Auxiliary>
    );
  }
}

export default SpaceXFlights;
