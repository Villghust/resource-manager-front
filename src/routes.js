import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import MainPage from './pages/main';
import { Toolbar } from './components/Toolbar';
import { Users } from './pages/users';
import { makeStyles } from '@material-ui/core';
import useCheckSchedulerData from './hooks/useCheckSchedulerData';
import useCheckUsers from './hooks/useCheckUsers';

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
                </Switch>
            </main>
        </Router>
    );
}
