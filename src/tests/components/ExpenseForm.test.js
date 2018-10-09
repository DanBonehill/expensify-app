import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

describe('ExpenseForm snapshot', () => {
   test('should render correctly with no expense', () => {
       const wrapper = shallow(<ExpenseForm/>);
       expect(wrapper).toMatchSnapshot()
   });

   test('should render correctly with expense data', () => {
       const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>);
       expect(wrapper).toMatchSnapshot()
   })
});

describe('ExpenseForm user interaction', () => {
    test('should render error for invalid form submission', () => {
        const wrapper = shallow(<ExpenseForm/>);
        expect(wrapper).toMatchSnapshot();
        wrapper.find('form').simulate('submit', {
            preventDefault: () => {}
        });
        expect(wrapper.state('error').length).toBeGreaterThan(0);
        expect(wrapper).toMatchSnapshot()
    });

    test('should set description on input change', () => {
        const wrapper = shallow(<ExpenseForm/>);
        const value = 'New Description';
        wrapper.find('input').at(0).simulate('change', {
            target: {value}
        });
        expect(wrapper.state('description')).toBe(value)
    });

    test('should set note on textarea change', () => {
        const wrapper = shallow(<ExpenseForm/>);
        const value = 'New Note';
        wrapper.find('textarea').at(0).simulate('change', {
            target: {value}
        });
        expect(wrapper.state('note')).toBe(value)
    });

    test('should set amount if valid input', () => {
        const wrapper = shallow(<ExpenseForm/>);
        const value = '23.50';
        wrapper.find('input').at(1).simulate('change', {
            target: {value}
        });
        expect(wrapper.state('amount')).toBe(value)
    });

    test('should not set amount if invalid input', () => {
        const wrapper = shallow(<ExpenseForm/>);
        const value = '23.550';
        wrapper.find('input').at(1).simulate('change', {
            target: {value}
        });
        expect(wrapper.state('amount')).toBe('')
    });

    test('should call onSubmit prop for valid form submission', () => {
        const onSubmitSpy = jest.fn();
        const wrapper = shallow(<ExpenseForm expense={expenses[2]} onSubmit={onSubmitSpy}/>);
        wrapper.find('form').simulate('submit', {
            preventDefault: () => {}
        });
        expect(wrapper.state('error')).toBe('');
        expect(onSubmitSpy).toHaveBeenLastCalledWith({
            description: expenses[2].description,
            amount: expenses[2].amount,
            note: expenses[2].note,
            createdAt: expenses[2].createdAt
        })
    });

    test('should set new date on date change', () => {
        const wrapper = shallow(<ExpenseForm/>);
        const now = moment();
        wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
        expect(wrapper.state('createdAt')).toEqual(now)
    });

    test('should set calendar focus on chage', () => {
        const wrapper = shallow(<ExpenseForm/>);
        wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({focused: true});
        expect(wrapper.state('calendarFocused')).toEqual(true)
    })
});