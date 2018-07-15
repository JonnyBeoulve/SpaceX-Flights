import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import SpaceXFlights from './SpaceXFlights';
import Footer from '../../components/Layout/Footer/Footer';

// Instantiate new Adapter for testing
configure({adapter: new Adapter()})

// Mock test for Chat state
describe('<SpaceXFlights />', () => {
    it('Contains one footer component in DOM', () => {
        const wrapper = shallow(<SpaceXFlights />);
        expect(wrapper.find(Footer)).toHaveLength(1);
    })
});