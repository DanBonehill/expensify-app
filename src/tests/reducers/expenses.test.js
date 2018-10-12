import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

describe('Initial state', () => {
    test('should setup default expenses value', () => {
        const state = expensesReducer(undefined, {type: "@@INIT"});
        expect(state).toEqual([])
    })
});

describe('ADD_EXPENSE action', () => {
   test('should add a new expense to the existing array', () => {
       const expense = {
           description: 'Rent',
           amount: 10000,
           createdAt: 0,
           note: ''
       };
       const state = expensesReducer(expenses, {type: "ADD_EXPENSE", expense});
       expect(state).toEqual([...expenses, expense])
   })
});

describe('REMOVE_EXPENSE action', () => {
    test('should remove an expense with a valid id from the existing array', () => {
        const action = {
            type: "REMOVE_EXPENSE",
            id: '1'
        };
        const state = expensesReducer(expenses, action);
        expect(state).toEqual([expenses[1], expenses[2]])
    });

    test('should  not remove an expense with an invalid id', () => {
        const action = {
            type: "REMOVE_EXPENSE",
            id: '123'
        };
        const state = expensesReducer(expenses, action);
        expect(state).toEqual([expenses[0], expenses[1], expenses[2]])
    })
});

describe('EDIT_EXPENSE action', () => {
    test('should edit an expense', () => {
        const updates = {
            description: "Amazon"
        };
        const action = {
            type: "EDIT_EXPENSE",
            id: expenses[0].id,
            updates
        };
        const state = expensesReducer(expenses, action);
        expect(state[0].description).toEqual(updates.description)
    });

    test('should not edit an expense with an invalid id', () => {
        const updates = {
            description: "Amazon"
        };
        const action = {
            type: "EDIT_EXPENSE",
            id: "123",
            updates
        };
        const state = expensesReducer(expenses, action);
        expect(state).toEqual(expenses)
    })
});

describe('SET_EXPENSES action', () => {
    test('should set expenses', () => {
         const action = {
             type: "SET_EXPENSES",
             expenses: [expenses[0]]
         };
         const state = expensesReducer(expenses, action);
        expect(state).toEqual([expenses[0]])
    })
});
