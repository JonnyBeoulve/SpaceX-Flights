import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";
import Auxiliary from "../../hoc/Auxiliary";
import Flight from "../../components/Flight/Flight";
import Footer from "../../components/Layout/Footer/Footer";
import Header from "../../components/Layout/Header/Header";
import classes from "./SpaceXFlights.css";

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
      data: [],
      selectedFlight: null,
      loading: true
    };
  }

  /*====================================================================== 
    // Upon this container being mounted, a call to the SpaceX API will 
    // be made.
    ======================================================================*/
  componentDidMount() {
    this.getData();
  }

  /*======================================================================
    // This will send a GET request to the SpaceX API to obtain details
    // for all flights.
    ======================================================================*/
  getData = () => {
    this.setState({
      loading: true
    });
    axios
      .get(`https://api.spacexdata.com/v2/launches`)
      .then(res => {
        this.setState({
          data: res.data,
          selectedFlight: res.data.length - 1,
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
    const { data, selectedFlight, loading } = this.state;
    const FLIGHT_OPTIONS = data.map(flight => ({
      key: flight.flight_number,
      value: flight.flight_number,
      label: `Flight ${flight.flight_number}`
    }));
    return (
      <Auxiliary>
        <div>
          <Header />
          {FLIGHT_OPTIONS.length > 0 && (
            <Select
              simpleValue
              className={classes.Select}
              onChange={selectedNum =>
                this.setState({ selectedFlight: selectedNum })
              }
              options={FLIGHT_OPTIONS}
              value={selectedFlight}
            />
          )}

          <article className={classes.Flight}>
            {loading ? (
              <div className={classes.Loader} />
            ) : (
              <Flight flight={data[selectedFlight - 1]} />
            )}
          </article>
          <Footer />
        </div>
      </Auxiliary>
    );
  }
}

export default SpaceXFlights;
