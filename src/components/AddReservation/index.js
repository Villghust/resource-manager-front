import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Grid,
    MenuItem,
    TextField,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import { DateTimePicker } from '@material-ui/pickers';
import { Form, Formik, Field, useFormikContext } from 'formik';

import moment from 'moment';

import { handleDialog } from '../../actions/dialogsActions';
import api from '../../services/api';
import PropTypes from 'prop-types';
import { getInfo } from '../../actions/reservationActions';

// initial state
const initialState = {
    currentStep: 1,
    resourceType: '',
    startDate: null,
    endDate: null,
    availableResources: null,
    selectedResource: null,
    userId: null,
};

const UserSelection = ({ ...rest }) => {
    const { setFieldValue, values } = useFormikContext();
    const userState = useSelector((state) => state.users);

    const handleChange = (event) => {
        setFieldValue('userId', event.target.value, true);
    };

    return (
        <TextField
            select
            value={values.userId}
            onChange={handleChange}
            {...rest}
        >
            {userState.data.map((user) => (
                <MenuItem key={user._id} value={user._id}>
                    {user.name}
                </MenuItem>
            ))}
        </TextField>
    );
};

const ResourceType = ({ ...rest }) => {
    // resource types
    const resourceTypes = [
        { label: 'Espaços físicos', value: 'physical_spaces' },
        { label: 'Equipamentos móveis', value: 'mobile_equipments' },
        { label: 'Móveis', value: 'furniture' },
    ];
    const { setFieldValue, values } = useFormikContext();

    const handleChange = (event) => {
        setFieldValue('resourceType', event.target.value, true);
    };

    return (
        <TextField
            select
            value={values.resourceType}
            onChange={handleChange}
            {...rest}
        >
            {resourceTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                    {type.label}
                </MenuItem>
            ))}
        </TextField>
    );
};

const ResourceSelection = ({ ...rest }) => {
    const { setFieldValue, values } = useFormikContext();

    const handleChange = (event) => {
        setFieldValue('selectedResource', event.target.value, true);
    };

    return (
        <TextField
            select
            value={values.selectedResource}
            onChange={handleChange}
            {...rest}
        >
            {values.availableResources.map((resource) => (
                <MenuItem key={resource._id} value={resource._id}>
                    {resource.name}
                </MenuItem>
            ))}
        </TextField>
    );
};

const DateSelection = ({ field, ...rest }) => {
    const { setFieldValue, values } = useFormikContext();

    const handleChange = (event) => {
        setFieldValue(field.name, event, true);
    };

    return (
        <DateTimePicker
            value={values[field.name]}
            onChange={handleChange}
            {...rest}
        />
    );
};
DateSelection.propTypes = {
    field: PropTypes.object,
};

export const AddReservationDialog = () => {
    // get dialog state
    const state = useSelector((state) => state.dialogs.addReservation);

    // set dialog state
    const dispatch = useDispatch();

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClose = () => {
        dispatch(handleDialog({ addReservation: false }));
    };

    const checkAvailability = async (values, setFieldValue) => {
        const available = await api.get(
            `/reservations/available?type=${
                values.resourceType
            }&startDate=${values.startDate.toISOString()}&endDate=${values.endDate.toISOString()}`
        );
        setFieldValue('availableResources', available.data.response, true);
        setFieldValue('currentStep', 2, true);
    };

    const submit = async (values) => {
        await api.post('reservations', {
            user_id: values.userId,
            resource_id: values.selectedResource,
            resource_type: values.resourceType,
            startDate: values.startDate,
            endDate: values.endDate,
        });
        handleClose();
        dispatch(getInfo());
    };

    //TODO create validation schema

    return (
        <Dialog open={state} onClose={handleClose} fullScreen={fullScreen}>
            <Formik
                initialValues={initialState}
                onSubmit={(values, { setFieldValue }) =>
                    values.currentStep === 1
                        ? checkAvailability(values, setFieldValue)
                        : submit(values)
                }
            >
                {({ values, isSubmitting }) => (
                    <Form>
                        <DialogTitle id="reservation-dialog-title">
                            Adicionar uma nova reserva
                        </DialogTitle>
                        <DialogContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field
                                        name="userId"
                                        id="user-id-field"
                                        component={UserSelection}
                                        variant="outlined"
                                        label="Usuário"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        name="resourceType"
                                        id="resource-type-field"
                                        component={ResourceType}
                                        variant="outlined"
                                        label="Tipo de recurso"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        name="startDate"
                                        id="start-date-field"
                                        inputVariant="outlined"
                                        label="Data de início"
                                        component={DateSelection}
                                        ampm={false}
                                        disablePast
                                        format="DD/MM/YYYY HH:mm"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        name="endDate"
                                        id="end-date-field"
                                        inputVariant="outlined"
                                        label="Data de fim"
                                        component={DateSelection}
                                        ampm={false}
                                        disablePast
                                        format="DD/MM/YYYY HH:mm"
                                        fullWidth
                                        minDate={
                                            values.resourceType === 'furniture'
                                                ? moment(values.startDate).add(
                                                      4,
                                                      'd'
                                                  )
                                                : moment(values.startDate).add(
                                                      1,
                                                      'd'
                                                  )
                                        }
                                    />
                                </Grid>
                                {values.currentStep === 2 && (
                                    <Grid item xs={12}>
                                        <Field
                                            name="selectedResource"
                                            id="selected-resource-field"
                                            variant="outlined"
                                            label="Recursos disponíves"
                                            component={ResourceSelection}
                                            fullWidth
                                        />
                                    </Grid>
                                )}
                            </Grid>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                color="primary"
                                disabled={isSubmitting}
                            >
                                {values.currentStep === 1
                                    ? 'Procurar recursos disponíveis'
                                    : 'Reservar recurso'}
                            </Button>
                        </DialogActions>
                    </Form>
                )}
            </Formik>
        </Dialog>
    );
};
