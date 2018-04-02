import React, {Component} from 'react';
import axios from 'axios';
import Select from 'react-select';

import Auxiliary from '../../hoc/Auxiliary';
import Flight from '../../components/Flight/Flight';
import Footer from '../../components/Layout/Footer/Footer';
import Header from '../../components/Layout/Header/Header';

/*======================================================================
// This will store the available flight selections on the dropdown.
======================================================================*/
const flightOptions = [
    { value: '1', label: 'Flight 1' }, { value: '2', label: 'Flight 2' }, { value: '3', label: 'Flight 3' }, { value: '4', label: 'Flight 4' }, { value: '5', label: 'Flight 5' },
    { value: '6', label: 'Flight 6' }, { value: '7', label: 'Flight 7' }, { value: '8', label: 'Flight 8' }, { value: '9', label: 'Flight 9' }, { value: '10', label: 'Flight 10' },
    { value: '11', label: 'Flight 11' }, { value: '12', label: 'Flight 12' }, { value: '13', label: 'Flight 13' }, { value: '14', label: 'Flight 14' }, { value: '15', label: 'Flight 15' },
    { value: '16', label: 'Flight 16' }, { value: '2', label: 'Flight 17' }, { value: '18', label: 'Flight 18' }, { value: '19', label: 'Flight 19' }, { value: '20', label: 'Flight 20' },
    { value: '21', label: 'Flight 21' }, { value: '22', label: 'Flight 22' }, { value: '23', label: 'Flight 23' }, { value: '24', label: 'Flight 24' }, { value: '25', label: 'Flight 25' },
    { value: '26', label: 'Flight 26' }, { value: '27', label: 'Flight 27' }, { value: '28', label: 'Flight 28' }, { value: '29', label: 'Flight 29' }, { value: '30', label: 'Flight 30' },
    { value: '31', label: 'Flight 31' }, { value: '32', label: 'Flight 32' }, { value: '33', label: 'Flight 33' }, { value: '34', label: 'Flight 34' }, { value: '35', label: 'Flight 35' },
    { value: '36', label: 'Flight 36' }, { value: '37', label: 'Flight 37' }, { value: '38', label: 'Flight 38' }, { value: '39', label: 'Flight 39' }, { value: '40', label: 'Flight 40' },
    { value: '41', label: 'Flight 41' }, { value: '42', label: 'Flight 42' }, { value: '43', label: 'Flight 43' }, { value: '44', label: 'Flight 44' }, { value: '45', label: 'Flight 45' },
    { value: '46', label: 'Flight 46' }, { value: '47', label: 'Flight 47' }, { value: '48', label: 'Flight 48' }, { value: '49', label: 'Flight 49' }, { value: '50', label: 'Flight 50' },
    { value: '51', label: 'Flight 51' }, { value: '52', label: 'Flight 52' }, { value: '53', label: 'Flight 53' }, { value: '54', label: 'Flight 54' }, { value: '55', label: 'Flight 55' },
    { value: '56', label: 'Flight 56' }, { value: '57', label: 'Flight 57' }, { value: '58', label: 'Flight 58' }
];

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
                flightTelemetry: null
            },
            loading: true,
            selectValue: 58
        };
    }

    /*====================================================================== 
    // Upon this container being mounted, a call to the SpaceX API will 
    // be made.
    ======================================================================*/
    componentDidMount() {
        this.getInformation(this.state.selectValue);
    }

    /*====================================================================== 
    // When a user selects an option from the dropdown, a GET request
    // will be made for the corresponding flight number.
    ======================================================================*/
    selectFlight = (selectedNum) => {
        console.log(selectedNum);
        this.getInformation(selectedNum);
        this.setState({
            selectValue: selectedNum
        })
    }

    /*======================================================================
    // This will send a GET request to the SpaceX API to obtain details
    // for a particular flight.
    ======================================================================*/
    getInformation = (query) => {
        this.setState({
            loading: true
        });
        axios.get(`https://api.spacexdata.com/v2/launches?flight_number=${query}`)
        
        .then((res) => {
            let videoLink = res.data[0].links.video_link;
            let videoEmbed = videoLink.slice(-11);
            videoEmbed = videoEmbed.replace (/^/, 'https://www.youtube.com/embed/');

            let telemetry;
            if (res.data[0].telemetry.flight_club === null) {
                telemetry = "Not Available";
            } else {
                telemetry = res.data[0].telemetry.flight_club;
            }
            this.setState({
                flightInformation: {
                    flightNumber: res.data[0].flight_number,
                    flightName: res.data[0].rocket.rocket_name,
                    flightYear: res.data[0].launch_year,
                    flightDetails: res.data[0].details,
                    flightLaunchSite: res.data[0].launch_site.site_name_long,
                    flightMissionPatch: res.data[0].links.mission_patch,
                    flightVideoEmbed: videoEmbed,
                    flightTelemetry: telemetry
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
                <Select onChange={this.selectFlight} options={flightOptions} simpleValue value={this.state.selectValue} />
                <Flight flightInfo={this.state.flightInformation} />
                <Footer />
            </Auxiliary>
        );
    }
}

export default SpaceXFlights;