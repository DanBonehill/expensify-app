import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';
import {ExpenseListFilters} from '../../components/ExpenseListFilters';
import {filters, altFilters} from "../fixtures/filters";

describe('ExpenseListFilters snapshot', () => {
    const setTextFilter = jest.fn();
    const sortByDate = jest.fn();
    const sortByAmount = jest.fn();
    const setStartDate = jest.fn();
    const setEndDate = jest.fn();
    const wrapper = shallow(
        <ExpenseListFilters
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
    );

    test('should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('should render correctly with altFilters', () => {
        wrapper.setProps({filters: altFilters});
        expect(wrapper).toMatchSnapshot();
    });

    test('should handle text change', () => {
        const value = 'rent';
        wrapper.find('input').simulate('change', {
            target: {value: value}
        });
        expect(setTextFilter).toHaveBeenLastCalledWith(value)
    });

    test('should handle sort by date', () => {
        const value = 'date';
        wrapper.setProps({filters: altFilters});
        wrapper.find('select').simulate('change', {
            target: {value: value}
        });
        expect(sortByDate).toHaveBeenCalled()

    });

    test('should handle sort by amount', () => {
        const value = 'amount';
        wrapper.find('select').simulate('change', {
            target: {value: value}
        });
        expect(sortByAmount).toHaveBeenCalled()
    });

    test('should handle date changes', () => {
        const startDate = moment(0).add(2, "weeks");
        const endDate = moment(0).add(3, "months");
        wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({startDate, endDate});
        expect(setStartDate).toHaveBeenCalledWith(startDate);
        expect(setEndDate).toHaveBeenCalledWith(endDate)
    });

    test('should handle focus changes', () => {
        const calendarFocused = 'endDate';
        wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused);
        expect(wrapper.state('calendarFocused')).toEqual(calendarFocused)
    })
});
