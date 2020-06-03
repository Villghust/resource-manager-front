import React, { useState } from 'react';

import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Appointments,
    AppointmentForm,
    DayView,
    MonthView,
    Scheduler,
    Toolbar,
    WeekView,
    ViewSwitcher,
    DateNavigator,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Paper } from '@material-ui/core';
import moment from 'moment';

const dummyData = [
    {
        _id: '5eba1f7833b9a19c110276ce',
        title: 'Appointment',
        startDate: '2020-06-03T20:25:43.511Z',
        endDate: '2020-06-03T21:25:43.511Z',
    },
    {
        _id: '5eba1f7833b9a19c110276cf',
        title: 'Appointment',
        startDate: '2020-06-03T18:25:43.511Z',
        endDate: '2020-06-03T19:25:43.511Z',
    },
];

export default function Schedule() {
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

    return (
        <Paper>
            <Scheduler data={dummyData}>
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
    );
}
