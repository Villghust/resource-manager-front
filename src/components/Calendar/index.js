import React from 'react';

import { EditingState } from '@devexpress/dx-react-scheduler';
import {
    Appointments,
    AppointmentForm,
    Scheduler,
    WeekView,
} from '@devexpress/dx-react-scheduler-material-ui';

const dummyData = [
    {
        _id: '5eba1f7633b9a19c110276cc',
        name: 'Otavio',
        apartment: '1309',
        startDate: '2020-05-11T18:25:43.511Z',
        endDate: '2020-05-12T18:25:43.511Z',
        __v: 0,
    },
    {
        _id: '5eba1f7733b9a19c110276cd',
        name: 'Otavio',
        apartment: '1309',
        startDate: '2020-05-11T18:25:43.511Z',
        endDate: '2020-05-12T18:25:43.511Z',
        __v: 0,
    },
    {
        _id: '5eba1f7833b9a19c110276ce',
        name: 'Otavio',
        apartment: '1309',
        startDate: '2020-05-11T18:25:43.511Z',
        endDate: '2020-05-12T18:25:43.511Z',
        __v: 0,
    },
    {
        _id: '5eba1f7833b9a19c110276cf',
        name: 'Otavio',
        apartment: '1309',
        startDate: '2020-05-11T18:25:43.511Z',
        endDate: '2020-05-12T18:25:43.511Z',
        __v: 0,
    },
];

export default function Schedule() {
    return (
        <Scheduler data={dummyData}>
            <EditingState />
            <WeekView />
        </Scheduler>
    );
}
