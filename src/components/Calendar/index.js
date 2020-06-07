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
import {
    Grid,
    Paper,
    Fab,
    IconButton,
    makeStyles,
    Tooltip,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DeleteIcon from '@material-ui/icons/Delete';
import { Skeleton } from '@material-ui/lab';
import currency from 'currency.js';
import moment from 'moment';
import PropTypes from 'prop-types';

import { handleDialog } from '../../actions/dialogsActions';
import { getInfo } from '../../actions/reservationActions';
import api from '../../services/api';
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

const AppointmentTooltipHeaderComponent = ({
    appointmentData,
    ...restProps
}) => {
    const dispatch = useDispatch();
    const deleteAppointment = async () => {
        try {
            await api.delete(`/reservations/${appointmentData._id}`);
            dispatch(getInfo());
        } catch (e) {
            alert('Houve um erro ao deletar a reserva. Tente novamente');
        }
    };

    return (
        <AppointmentTooltip.Header {...restProps}>
            {moment().isBefore(appointmentData.startDate) && (
                <IconButton onClick={deleteAppointment}>
                    <DeleteIcon />
                </IconButton>
            )}
        </AppointmentTooltip.Header>
    );
};
AppointmentTooltipHeaderComponent.propTypes = {
    appointmentData: PropTypes.object.isRequired,
};

const AppointmentTooltipContentComponent = ({
    appointmentData,
    ...restProps
}) => (
    <AppointmentTooltip.Content
        {...restProps}
        appointmentData={appointmentData}
    >
        <Grid container alignItems="center">
            <Grid item xs={2} style={{ textAlign: 'center' }}>
                <AttachMoneyIcon />
            </Grid>
            <Grid item xs={10}>
                <span>
                    {currency(appointmentData.total_cost).divide(100).format()}
                </span>
            </Grid>
        </Grid>
    </AppointmentTooltip.Content>
);
AppointmentTooltipContentComponent.propTypes = {
    appointmentData: PropTypes.object.isRequired,
};

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
                        <AppointmentTooltip
                            headerComponent={AppointmentTooltipHeaderComponent}
                            contentComponent={
                                AppointmentTooltipContentComponent
                            }
                            showCloseButton
                        />
                    </Scheduler>
                </Paper>
                <Tooltip title="Reservar recurso" placement="left">
                    <Fab
                        color="primary"
                        className={classes.fab}
                        id="add-resource-button"
                        onClick={handleOpenAddReservationDialog}
                    >
                        <AddIcon />
                    </Fab>
                </Tooltip>
            </div>
            <AddReservationDialog />
        </>
    );
};
