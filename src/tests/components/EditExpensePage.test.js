import React from 'react';
import {shallow} from 'enzyme';
import expenses from '../fixtures/expenses';
import {EditExpensePage} from '../../components/EditExpensePage';

describe('EditExpensePage snapshot', () => {
    const startEditExpense = jest.fn();
    const startRemoveExpense = jest.fn();
    const history = {push: jest.fn()};
    const wrapper = shallow(
        <EditExpensePage
            startEditExpense={startEditExpense}
            startRemoveExpense={startRemoveExpense}
            history={history}
            expense={expenses[0]}
        />
    );

    test('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should handle editExpense', () => {
        wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
        expect(history.push).toHaveBeenLastCalledWith('/');
        expect(startEditExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
    });

    test('should handle removeExpense', () => {
        wrapper.find('button').simulate('click');
        expect(history.push).toHaveBeenLastCalledWith('/');
        expect(startRemoveExpense).toHaveBeenLastCalledWith({id: expenses[0].id});
    })
});