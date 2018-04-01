import React, {Component} from 'react';
import axios from 'axios';

import Auxiliary from '../../hoc/Auxiliary';
import Flight from '../../components/Flight/Flight';
import Footer from '../../components/Layout/Footer/Footer';
import Header from '../../components/Layout/Header/Header';

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
                flightDetails: null,
                flightLaunchSite: null,
                flightMissionPatch: null,
                flightVideoEmbed: null,
                flightTelemetry: null
            },
            loading: true
        };
    }

    /*====================================================================== 
    // Upon this container being mounted, a call to the SpaceX API will 
    // be made.
    ======================================================================*/
    componentDidMount() {
        this.getInformation();
    }

    /*======================================================================
    // This will send a GET request to the SpaceX API to obtain details
    // for a particular flight.
    ======================================================================*/
    getInformation = () => {
        this.setState({
            loading: true
        });
        axios.get(`https://api.spacexdata.com/v2/launches/latest`)
        
        .then((res) => {
            let videoLink = res.data.links.video_link;
            let videoEmbed = videoLink.slice(-11);
            videoEmbed = videoEmbed.replace (/^/, 'https://www.youtube.com/embed/');

            console.log(videoEmbed);
            this.setState({
                flightInformation: {
                    flightNumber: res.data.flight_number,
                    flightName: res.data.rocket.rocket_name,
                    flightYear: res.data.launch_year,
                    flightDetails: res.data.details,
                    flightLaunchSite: res.data.launch_site.site_name_long,
                    flightMissionPatch: res.data.links.mission_patch,
                    flightVideoEmbed: videoEmbed,
                    flightTelemetry: res.data.telemetry.flight_club
                },
                loading: false
            })
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
                <Flight flightInfo={this.state.flightInformation} />
                <Footer />
            </Auxiliary>
        );
    }
}

export default SpaceXFlights;