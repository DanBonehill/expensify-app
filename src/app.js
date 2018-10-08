import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import {addExpense} from "./actions/expenses";
import {setTextFilter} from "./actions/filters";

import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

store.dispatch(addExpense({description: "Water bill", amount: 10000}));
store.dispatch(addExpense({description: "Gas bill", amount: 5000}));
store.dispatch(setTextFilter("gas"));

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
