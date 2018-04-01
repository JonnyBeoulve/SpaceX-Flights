import React, { Component } from 'react';

import FlightDetails from './containers/FlightDetails/FlightDetails';
import Layout from './components/Layout/Layout';

/*======================================================================
// This will handle the rendering of the Flight Details page.
======================================================================*/
class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <FlightDetails />
        </Layout>
      </div>
    );
  }
}

export default App;
