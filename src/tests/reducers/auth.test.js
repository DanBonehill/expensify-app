import authReducer from '../../reducers/auth';

describe('LOGIN action', () => {
    test('should add users uid to store', () => {
        const uid = 'abcde';
        const state = authReducer({}, {type: "LOGIN", uid: uid});
        expect(state).toEqual({uid})
    })
});

describe('LOGOUT action', () => {
    test('should set store to empty', () => {
        const state = authReducer({uid: 'abcde'}, {type: "LOGOUT"});
        expect(state).toEqual({})
    })
});