import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

describe('getExpensesTotal', () => {
    test('should return 0 if no expenses', () => {
        const total = selectExpensesTotal([]);
        expect(total).toEqual(0)
    });

    test('should correctly add up a single expense', () => {
        const total = selectExpensesTotal([expenses[0]]);
        expect(total).toEqual(10500)
    });

    test('should correctly add up multiple expenses', () => {
        const total = selectExpensesTotal(expenses);
        expect(total).toEqual(55705)
    })
});