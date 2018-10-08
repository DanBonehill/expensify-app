import moment from "moment";
import selectExpenses from '../../selectors/expenses';

const expenses = [
    {
        id: '1',
        description: "Rent",
        note: '',
        amount: 10500,
        createdAt: 0
    },
    {
        id: '2',
        description: "Coffee",
        note: '',
        amount: 205,
        createdAt: moment(0).subtract(4, 'days').valueOf()
    },
    {
        id: '3',
        description: "Credit Card",
        note: '',
        amount: 45000,
        createdAt: moment(0).add(4, "days").valueOf()
    }
];

const defaultFilters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

describe('Text filter', () => {
    test('should filter by text value', () => {
        const filters = {
            ...defaultFilters,
            text: 'r'
        };
        const result = selectExpenses(expenses, filters);
        expect(result).toEqual([expenses[2], expenses[0]])
    });
});

describe('Start Date filter', () => {
    test('should filter by startDate', () => {
        const filters = {
            ...defaultFilters,
            startDate: moment(0)
        };
        const result = selectExpenses(expenses, filters);
        expect(result).toEqual([expenses[2], expenses[0]])
    });
});

describe('End Date filter', () => {
    test('should filter by endDate', () => {
        const filters = {
            ...defaultFilters,
            endDate: moment(0)
        };
        const result = selectExpenses(expenses, filters);
        expect(result).toEqual([expenses[0], expenses[1]])
    });
});

describe('Sort by Date filter', () => {
    test('should sort expenses by date, showing the most recent first', () => {
        const filters = {
            ...defaultFilters
        };
        const result = selectExpenses(expenses, filters);
        expect(result).toEqual([expenses[2], expenses[0], expenses[1]])
    })
});

describe('Sort by Amount filter', () => {
    test('should sort expenses by amount, showing the most expensive first', () => {
        const filters = {
                ...defaultFilters,
            sortBy: 'amount'
        };
        const result = selectExpenses(expenses, filters);
        expect(result).toEqual([expenses[2], expenses[0], expenses[1]])
    })
});