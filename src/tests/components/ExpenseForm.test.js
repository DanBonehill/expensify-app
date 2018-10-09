import React from 'react';
import {shallow} from 'enzyme'
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

describe('ExpenseForm snapshot', () => {
   test('should render correctly with no expense', () => {
       const wrapper = shallow(<ExpenseForm/>);
       expect(wrapper).toMatchSnapshot()
   });

   test('should render correctly with expense data', () => {
       const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>)
       expect(wrapper).toMatchSnapshot()
   })
});