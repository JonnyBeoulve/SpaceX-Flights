import React, { Component } from 'react';

import SpaceXFlights from './containers/SpaceXFlights/SpaceXFlights';
import Layout from './components/Layout/Layout';

/*======================================================================
// This will handle the rendering of the Flight Details page.
======================================================================*/
class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <SpaceXFlights />
        </Layout>
      </div>
    );
  }
}

export default App;
