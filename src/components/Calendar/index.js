import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Appointments,
    MonthView,
    Scheduler,
    Toolbar,
    DateNavigator,
    AppointmentTooltip,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Paper, Fab, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Skeleton } from '@material-ui/lab';
import moment from 'moment';

import { handleDialog } from '../../actions/dialogsActions';
import { AddReservationDialog } from '../AddReservation';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(4),
    },
}));

export const Schedule = () => {
    const dispatch = useDispatch();

    // reservation state
    const reservationState = useSelector((state) => state.reservation);

    // material-ui styles
    const classes = useStyles();

    // manage the date to show on the scheduler
    const [date, setDate] = useState(moment()._d);

    // change the date to display on the scheduler
    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    // open reservation dialog
    const handleOpenAddReservationDialog = () => {
        dispatch(handleDialog({ addReservation: true }));
    };

    // loading component
    if (reservationState.loading) {
        return <Skeleton variant="rect" height={250} />;
    }

    // error component
    if (reservationState.error) {
        return <p>Error</p>;
    }

    // format data to display correct title
    const formattedData = (reservation) => ({
        ...reservation,
        title: reservation.resource.name,
    });

    const data = reservationState.data
        ? reservationState.data.map(formattedData)
        : [];

    return (
        <>
            <div className={classes.root}>
                <Paper>
                    <Scheduler data={data} locale={'pt-BR'}>
                        <ViewState
                            currentDate={date}
                            onCurrentDateChange={handleDateChange}
                        />
                        <MonthView name="month" />
                        <Toolbar />
                        <DateNavigator />
                        <Appointments />
                        <AppointmentTooltip />
                    </Scheduler>
                </Paper>
                <Fab
                    color="primary"
                    className={classes.fab}
                    id="add-resource-button"
                    onClick={handleOpenAddReservationDialog}
                >
                    <AddIcon />
                </Fab>
            </div>
            <AddReservationDialog />
        </>
    );
};
