import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Appointments,
    DayView,
    MonthView,
    Scheduler,
    Toolbar,
    WeekView,
    ViewSwitcher,
    DateNavigator,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Paper, Fab, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';

import { handleDialog } from '../../actions/dialogsActions';
import { AddReservationDialog } from '../AddReservation';
import { Skeleton } from '@material-ui/lab';

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

    // set the view state of the scheduler component
    const [viewState, setViewState] = useState('week');

    // manage the date to show on the scheduler
    const [date, setDate] = useState(moment()._d);

    // change the view state
    const handleViewChange = (newView) => {
        setViewState(newView);
    };

    // change the date to display on the scheduler
    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    // open reservation dialog
    const handleOpenAddReservationDialog = () => {
        dispatch(handleDialog({ addReservation: true }));
    };

    if (reservationState.loading) {
        return <Skeleton variant="rect" height={250} />;
    }

    if (reservationState.error) {
        return <p>Error</p>;
    }

    const formattedData = () => {
        //TODO finish formatted data
    };

    return (
        <>
            <div className={classes.root}>
                <Paper>
                    <Scheduler data={reservationState.data}>
                        <ViewState
                            currentViewName={viewState}
                            onCurrentViewNameChange={handleViewChange}
                            currentDate={date}
                            onCurrentDateChange={handleDateChange}
                        />
                        <DayView name="day" />
                        <WeekView name="week" />
                        <MonthView name="month" />
                        <Toolbar />
                        <DateNavigator />
                        <ViewSwitcher />
                        <Appointments />
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
