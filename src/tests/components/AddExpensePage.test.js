import React from 'react';
import {shallow} from 'enzyme';
import expenses from '../fixtures/expenses';
import {AddExpensePage} from '../../components/AddExpensePage';

describe('AddExpensePage snapshot', () => {
    const startAddExpense = jest.fn();
    const history = {push: jest.fn()};
    const wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history}/>);

    test('should render correctly', () => {
        expect(wrapper).toMatchSnapshot()
    });

    test('should handle addExpense', () => {
        wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
        expect(history.push).toHaveBeenLastCalledWith('/');
        expect(startAddExpense).toHaveBeenLastCalledWith(expenses[0]);
    })
});
