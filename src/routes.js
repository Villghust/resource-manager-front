import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { makeStyles } from '@material-ui/core';

import { Toolbar } from './components/Toolbar';
import useCheckSchedulerData from './hooks/useCheckSchedulerData';
import useCheckUsers from './hooks/useCheckUsers';
import MainPage from './pages/main';
import { Reports } from './pages/reports';
import { Resources } from './pages/resources';
import { Users } from './pages/users';

const useStyles = makeStyles((theme) => ({
    offset: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3),
    },
}));

export default function Routes() {
    // fix toolbar issue
    const classes = useStyles();

    // update reservations if empty
    useCheckSchedulerData();

    // update users if empty
    useCheckUsers();

    return (
        <Router>
            <Toolbar />
            <main className={classes.content}>
                <div className={classes.offset} />
                <Switch>
                    <Route exact path="/">
                        <MainPage />
                    </Route>
                    <Route exact path="/users">
                        <Users />
                    </Route>
                    <Route exact path="/resources">
                        <Resources />
                    </Route>
                    <Route exact path="/reports">
                        <Reports />
                    </Route>
                </Switch>
            </main>
        </Router>
    );
}
