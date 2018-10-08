import moment from 'moment';
import filtersReducer from '../../reducers/filters';

describe('Initial state', () => {
    test('should setup default filter values', () => {
        const state = filtersReducer(undefined, { type: "@@INIT"});
        expect(state).toEqual({
            text: '',
            sortBy: 'date',
            startDate: moment().startOf('month'),
            endDate: moment().endOf("month")
        })
    });
});

describe('SORT_BY_AMOUNT action', () => {
    test('should set sortBy to amount', () => {
        const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});
        expect(state.sortBy).toBe('amount');
    });
});

describe('SORT_BY_DATE action', () => {
    test('should set sortBy to date', () => {
        const currentState = {
            text: '',
            sortBy: 'amount',
            startDate: undefined,
            endDate: undefined
        };
        const state = filtersReducer(currentState, {type: 'SORT_BY_DATE'});
        expect(state.sortBy).toBe('date');
    });
});

describe('SET_TEXT_FILTER action', () => {
    test('should set the text filter', () => {
        const textFilter = 'Rent';
        const state = filtersReducer(undefined, { type: "SET_TEXT_FILTER", text: textFilter});
        expect(state.text).toBe(textFilter)
    })
});

describe('SET_START_DATE action', () => {
    test('should set startDate filter', () => {
        const date = moment();
        const state = filtersReducer(undefined, { type: "SET_START_DATE", date});
        expect(state.startDate).toEqual(date)
    })
});

describe('SET_END_DATE action', () => {
    test('should set endtDate filter', () => {
        const date = moment();
        const state = filtersReducer(undefined, { type: "SET_END_DATE", date});
        expect(state.endDate).toEqual(date)
    })
});