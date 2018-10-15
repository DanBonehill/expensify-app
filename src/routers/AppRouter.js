import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

import LoginPage from '../components/LoginPage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';

const AppRouter = () => (
    <Router>
        <div>
            <Header/>
            <Switch>
                <Route path="/" component={LoginPage} exact/>
                <Route path="/dashboard" component={ExpenseDashboardPage} exact/>
                <Route path="/create" component={AddExpensePage} exact/>
                <Route path="/edit/:id" component={EditExpensePage} exact/>
                <Route path="/help" component={HelpPage} exact/>
                <Route component={NotFoundPage}/>
            </Switch>
        </div>
    </Router>
);

export default AppRouter