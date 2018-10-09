import React from 'react';
import {shallow} from 'enzyme';
import expenses from '../fixtures/expenses';
import {AddExpensePage} from '../../components/AddExpensePage';

describe('AddExpensePage snapshot', () => {
    const onSubmit = jest.fn();
    const history = {push: jest.fn()};
    const wrapper = shallow(<AddExpensePage onSubmit={onSubmit} history={history}/>);

    test('should render correctly', () => {
        expect(wrapper).toMatchSnapshot()
    });

    test('should handle onSubmit', () => {
        wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
        expect(history.push).toHaveBeenLastCalledWith('/');
        expect(onSubmit).toHaveBeenLastCalledWith(expenses[0]);
    })
});
