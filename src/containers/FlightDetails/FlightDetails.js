import React, {Component} from 'react';
import axios from 'axios';

import Auxiliary from '../../hoc/Auxiliary';
import Footer from '../../components/Layout/Footer/Footer';
import Header from '../../components/Layout/Header/Header';

/*======================================================================
// This container will request details for a specific SpaceX Flight
// from the company's official API before passing that information
// down to a component to display to the user.
======================================================================*/
class FlightDetails extends Component {
    /*======================================================================
    // This will house the main states of the program, namely the
    // object obtained from the SpaceX API GET request.
    ======================================================================*/
    constructor() {
        super();
        this.state = {
            flightDetails: [],
            loading: true
        };
    }

    /*====================================================================== 
    // Upon this FLightDetails container being mounted, a call to the
    // SpaceX API will be made.
    ======================================================================*/
    componentDidMount() {
        this.getDetails();
    }

    /*======================================================================
    // This will send a GET request to the SpaceX API to obtain details
    // for a particular flight.
    ======================================================================*/
    getDetails = () => {
        this.setState({
            loading: true
        });
        axios.get(`https://api.spacexdata.com/v2/launches/latest`)
        
        .then((res) => {
            console.log(res);
            this.setState({
                flightDetails: res.data.data, 
                loading: false, 
            })
            console.log(this.state.flightDetails[0]);
        })
        .catch(err => {
        this.setState({
            loading: false
        })
        console.log('Error fetching and parsing data.', err)
        })
    }

    render () {
        return (
            <Auxiliary>
                <Header />
                <Footer />
            </Auxiliary>
        );
    }
}

export default FlightDetails;