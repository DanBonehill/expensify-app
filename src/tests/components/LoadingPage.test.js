import React from 'react';
import {shallow} from 'enzyme';
import LoadingPage from '../../components/LoadingPage';

describe('Loading Page snapshot', () => {
    test('should render correctly', () => {
        const wrapper = shallow(<LoadingPage />);
        expect(wrapper).toMatchSnapshot();
    });
});