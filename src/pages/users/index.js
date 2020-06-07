import React from 'react';

import { Container, Grid, Icon, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PeopleIcon from '@material-ui/icons/People';

import { ListUsers } from '../../components/Users/list';

const useStyles = makeStyles({
    icon: {
        display: 'flex',
        alignItems: 'center',
    },
});

export const Users = () => {
    const classes = useStyles();

    return (
        <Container maxWidth="md">
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <div className={classes.icon}>
                                <PeopleIcon />
                            </div>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">Colaboradores</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <ListUsers />
                </Grid>
            </Grid>
        </Container>
    );
};
