import React from 'react';
import {shallow} from 'enzyme';
import expenses from '../fixtures/expenses';
import {ExpensesSummary, ExpenseSummary} from '../../components/ExpensesSummary';

describe('ExpenseSummary snapshot', () => {
    test('should render correctly with one expense', () => {
        const wrapper = shallow(<ExpensesSummary expensesCount={1} expensesTotal={20000}/>);
        expect(wrapper).toMatchSnapshot()
    });

    test('should render correctly with two expenses', () => {
        const wrapper = shallow(<ExpensesSummary expensesCount={2} expensesTotal={215000}/>);
        expect(wrapper).toMatchSnapshot()
    })
});