import React from 'react';
import { Link } from '../Link';
import {
    AppBar,
    Toolbar as MuiToolbar,
    Typography,
    makeStyles,
} from '@material-ui/core';

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
                </MuiToolbar>
            </AppBar>
        </div>
    );
};
