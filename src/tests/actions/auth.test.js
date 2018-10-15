import {login, logout} from "../../actions/auth";

describe("login action", ()=> {
    test('should setup login action object with uid', () => {
        const uid = 'abcde';
        const action = login(uid);
        expect(action).toEqual({
            type: "LOGIN",
            uid
        })
    });
});

describe("logout action", ()=> {
    test('should setup login action object with uid', () => {
        const action = logout();
        expect(action).toEqual({
            type: "LOGOUT"
        })
    });
});