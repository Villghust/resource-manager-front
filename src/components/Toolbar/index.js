import React from 'react';

import {
    AppBar,
    Toolbar as MuiToolbar,
    Typography,
    makeStyles,
} from '@material-ui/core';

import { Link } from '../Link';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    link: {
        marginRight: theme.spacing(2),
    },
    toolbar: {
        justifyContent: 'center',
    },
}));

export const Toolbar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <MuiToolbar className={classes.toolbar}>
                    <Link to="/">
                        <Typography variant="h6" className={classes.link}>
                            Agenda
                        </Typography>
                    </Link>
                    <Link to="/users">
                        <Typography variant="h6" className={classes.link}>
                            Colaboradores
                        </Typography>
                    </Link>
                    <Link to="/resources">
                        <Typography variant="h6" className={classes.link}>
                            Recursos
                        </Typography>
                    </Link>
                    <Link to="/reports">
                        <Typography variant="h6" className={classes.link}>
                            Relatórios
                        </Typography>
                    </Link>
                </MuiToolbar>
            </AppBar>
        </div>
    );
};
