import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    addExpense,
    startAddExpense,
    editExpense,
    startEditExpense,
    removeExpense,
    startRemoveExpense,
    setExpenses,
    startSetExpenses
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);
const uid = 'abcde';
const defaultAuthState = {auth: {uid}};

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({id, description, note, amount, createdAt}) => {
        expensesData[id] = {description, note, amount, createdAt}
    });
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

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
        const store = createMockStore(defaultAuthState);
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

            return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
        }).then((snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        });
    });

    test('should add expense with defaults to database and store', (done) => {
        const store = createMockStore(defaultAuthState);
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

            return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
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

describe('Start Remove action', () => {
    test('should remove expenses from db', (done) => {
        const store = createMockStore(defaultAuthState);
        const id = expenses[0].id;

        store.dispatch(startRemoveExpense({id})).then(() => {
            const actions = store.getActions();
            expect(actions).toEqual([{
                type: 'REMOVE_EXPENSE',
                id
            }]);
            return database.ref(`users/${uid}/expenses/${id}`).once('value');
        }).then((snapshot) => {
            expect(snapshot.val()).toBeFalsy();
            done()
        })
    })
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

describe('Start Edit action', () => {
    test('should edit expenses from db', (done) => {
        const store = createMockStore(defaultAuthState);
        const id = expenses[0].id;
        const updates = {
            description: "Broadband"
        };

        store.dispatch(startEditExpense(id, updates)).then(() => {
            const actions = store.getActions();
            expect(actions).toEqual([{
                type: "EDIT_EXPENSE",
                id,
                updates
            }]);

            return database.ref(`users/${uid}/expenses/${id}`).once('value');
        }).then((snapshot) => {
            expect(snapshot.val().description).toEqual(updates.description);
            done()
        })
    })
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
    test('should fetch expenses from db', (done) => {
        const store = createMockStore(defaultAuthState);

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