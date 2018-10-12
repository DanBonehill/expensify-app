import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    addExpense,
    startAddExpense,
    editExpense,
    removeExpense,
    setExpenses,
    startSetExpenses
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

describe("Add action", ()=> {
   test('should setup add expense action object with provided values', () => {
       const action = addExpense(expenses[2]);
       expect(action).toEqual({
           type: "ADD_EXPENSE",
           expense: expenses[2]
       })
   });
});

describe('Start Add action', () => {
    test('should add expense to database and store', (done) => {
        const store = createMockStore({});
        const expenseData = {
            description: 'mouse',
            amount: 3000,
            note: 'My old one broke',
            createdAt: 1000
        };
        store.dispatch(startAddExpense(expenseData)).then(() => {
            const actions = store.getActions();
            expect(actions).toEqual([{
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseData
                }
            }]);

            return database.ref(`expenses/${actions[0].expense.id}`).once('value');
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });
    });

    test('should add expense with defaults to database and store', (done) => {
        const store = createMockStore({});
        const expenseDefaults = {
            description: '',
            amount: 0,
            note: '',
            createdAt: 0
        };
        store.dispatch(startAddExpense({})).then(() => {
            const actions = store.getActions();
            expect(actions).toEqual([{
                type: 'ADD_EXPENSE',
                expense: {
                    id: expect.any(String),
                    ...expenseDefaults
                }
            }]);

            return database.ref(`expenses/${actions[0].expense.id}`).once('value');
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseDefaults);
            done();
        });
    })
});

describe("Remove action", () => {
    test('should setup remove expense action object', () => {
        const action = removeExpense({id: '123'});
        expect(action).toEqual({
            type: "REMOVE_EXPENSE",
            id: '123'
        })
    });
});

describe("Edit action", () => {
    test('should setup edit expense action object', () => {
        const action = editExpense('123', {description: "Rent"});
        expect(action).toEqual({
            type: "EDIT_EXPENSE",
            id: '123',
            updates: {
                description: "Rent"
            }
        })
    });
});

describe("Set action", () => {
    test('should setup set expense action object with data', () => {
        const action = setExpenses(expenses);
        expect(action).toEqual({
            type: "SET_EXPENSES",
            expenses
        })
    });
});

describe('Start Set action', () => {
    beforeEach((done) => {
        const expensesData = {};
        expenses.forEach(({id, description, note, amount, createdAt}) => {
            expensesData[id] = {description, note, amount, createdAt}
        });
        database.ref('expenses').set(expensesData).then(() => done());
    });

    test('should fetch expenses from db', (done) => {
        const store = createMockStore({});

        store.dispatch(startSetExpenses()).then(() => {
            const actions = store.getActions();
            expect(actions).toEqual([{
                type: 'SET_EXPENSES',
                expenses
            }]);
            done()
        })
    })
});