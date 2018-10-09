import React from 'react';
import {shallow} from 'enzyme';
import ExpenseDashboardPage from '../../components/ExpenseDashboardPage';

describe('ExpenseDashboardPage snapshot', () => {
    test('should render correctly', () => {
        const wrapper = shallow(<ExpenseDashboardPage/>);
        expect(wrapper).toMatchSnapshot()
    })
});