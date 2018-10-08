import moment from 'moment';
import {
    setStartDate,
    setEndDate,
    sortByDate,
    sortByAmount,
    setTextFilter
} from '../../actions/filters'

describe('setTextFilter', () => {
    test('should generate text filter action with provided text', () => {
        const action = setTextFilter('rent');
        expect(action).toEqual({
            type: "SET_TEXT_FILTER",
            text: 'rent'
        })
    });

    test('should generate text filter action with no text', () => {
        const action = setTextFilter();
        expect(action).toEqual({
            type: "SET_TEXT_FILTER",
            text: ''
        })
    });
});

describe('sortByDate action', () => {
    test('should generate sort by date action object', () => {
        expect(sortByDate()).toEqual({
            type: "SORT_BY_DATE"
        })
    });
});

describe('sortByAmount action', () => {
    test('should generate sort by amount action object', () => {
        expect(sortByAmount()).toEqual({
            type: "SORT_BY_AMOUNT"
        })
    });
});

describe('setStartDate action', () => {
    test('should generate set start date action object', () => {
        const action = setStartDate(moment(0));
        expect(action).toEqual({
            type: "SET_START_DATE",
            date: moment(0)
        })
    });
});

describe('setEndDate action', () => {
    test('should generate set end date action object', () => {
        const action = setEndDate(moment(0));
        expect(action).toEqual({
            type: "SET_END_DATE",
            date: moment(0)
        })
    });
});