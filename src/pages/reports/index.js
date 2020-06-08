import React from 'react';

import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AssessmentIcon from '@material-ui/icons/Assessment';

import { ReportsList } from '../../components/Reports';

const useStyles = makeStyles({
    icon: {
        display: 'flex',
        alignItems: 'center',
    },
});

export const Reports = () => {
    const classes = useStyles();

    return (
        <Container maxWidth="md">
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <div className={classes.icon}>
                                <AssessmentIcon />
                            </div>
                        </Grid>
                        <Grid item>
                            <Typography variant="h5">Relatórios</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <ReportsList />
                </Grid>
            </Grid>
        </Container>
    );
};
