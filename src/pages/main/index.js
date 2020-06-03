import React from 'react';

import { Container } from '@material-ui/core';

import Schedule from '../../components/Calendar';

export default function MainPage() {
    return (
        <Container>
            <Schedule />
        </Container>
    );
}
