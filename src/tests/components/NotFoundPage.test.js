import React from 'react';
import {shallow} from 'enzyme';
import NotFoundPage from '../../components/NotFoundPage';

describe('NotFoundPage snapshot', () => {
    test('should render correctly', () => {
        const wrapper = shallow(<NotFoundPage/>);
        expect(wrapper).toMatchSnapshot()
    })
});