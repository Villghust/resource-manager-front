import React, { useEffect, useState } from 'react';

import {
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Paper,
    TextField,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import currency from 'currency.js';

import api from '../../services/api';

const filters = [
    { label: 'Colaboradores', value: 'users' },
    { label: 'Recursos', value: 'resources' },
];

export const ReportsList = () => {
    const [reportType, setReportType] = useState('users');

    const [request, setRequest] = useState({
        data: null,
        loading: true,
        error: false,
    });

    // update report on filter change
    async function updateComponents() {
        try {
            setRequest({ ...request, loading: true, error: false });
            const response = await api.get(`/${reportType}/cost`);
            setRequest({
                ...request,
                loading: false,
                error: false,
                data: response.data,
            });
        } catch (e) {
            setRequest({ loading: false, error: true, data: null });
        }
    }

    useEffect(() => {
        updateComponents();
        //eslint-disable-next-line
    }, [reportType]);

    const handleChangeFilter = (event) => {
        setReportType(event.target.value);
    };

    // format resource name
    function resourceNameFormatter(name) {
        switch (name) {
            case 'mobile_equipments':
                return 'Equipamento móvel';
            case 'physical_spaces':
                return 'Espaço físico';
            case 'furniture':
                return 'Mobília';
            default:
                return '';
        }
    }

    if (request.loading) {
        return <Skeleton variant="rect" height={250} />;
    }

    if (request.error) {
        return <p>Erro</p>;
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} style={{ textAlign: 'right' }}>
                <TextField
                    name="reportFilter"
                    id="report-filter"
                    label="Filtrar por"
                    value={reportType}
                    onChange={handleChangeFilter}
                    select
                    variant="outlined"
                    style={{ textAlign: 'left', minWidth: 160 }}
                >
                    {filters.map((filter) => (
                        <MenuItem key={filter.value} value={filter.value}>
                            {filter.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <Paper>
                    <List component="nav">
                        {request.data.map((cost, i) => (
                            <div key={cost._id}>
                                <ListItem>
                                    <ListItemText
                                        primary={
                                            reportType === 'users'
                                                ? `Colaborador: ${cost.name}`
                                                : `Recurso: ${cost.name}`
                                        }
                                    />
                                </ListItem>
                                {cost.type && (
                                    <ListItem>
                                        <ListItemText
                                            primary={`Tipo do recurso: ${resourceNameFormatter(
                                                cost.type
                                            )}`}
                                        />
                                    </ListItem>
                                )}
                                <ListItem>
                                    <ListItemText
                                        primary={`Custo total: R$${currency(
                                            cost.total_cost
                                        )
                                            .divide(100)
                                            .format()}`}
                                    />
                                </ListItem>
                                {request.data.length !== i + 1 && <Divider />}
                            </div>
                        ))}
                    </List>
                </Paper>
            </Grid>
        </Grid>
    );
};
