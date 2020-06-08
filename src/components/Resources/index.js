import React, { useState } from 'react';

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
import { makeStyles } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab';
import currency from 'currency.js';

import useApiRequest from '../../hooks/useApiRequest';

const useStyles = makeStyles({
    root: {
        wordWrap: 'break-word',
    },
    filterSize: {
        minWidth: 220,
        textAlign: 'left',
    },
});

const resourceTypes = [
    { label: 'Todos', value: 'all' },
    { label: 'Espaços físicos', value: 'physical_spaces' },
    { label: 'Equipamentos móveis', value: 'mobile_equipments' },
    { label: 'Mobília', value: 'furniture' },
];

export const ListResources = () => {
    const classes = useStyles();

    const { data, loading, error } = useApiRequest(true, '/resources');

    const [resourceFilter, setResourceFilter] = useState('all');
    const handleChangeFilter = (event) => {
        setResourceFilter(event.target.value);
    };

    const formatResourceType = (resource) => {
        switch (resource) {
            case 'furniture':
                return 'Mobília';
            case 'mobile_equipments':
                return 'Equipamento móvel';
            case 'physical_spaces':
                return 'Espaço físico';
            default:
                return '';
        }
    };

    const formatCost = (resource) => {
        if (resource.type === 'physical_spaces') {
            return `Custo por metro quadrado: R$${currency(resource.cost)
                .divide(100)
                .format()}`;
        } else {
            return `Custo: R$${currency(resource.cost).divide(100).format()}`;
        }
    };

    if (loading) {
        return <Skeleton variant="rect" height={250} />;
    }

    if (error) {
        return <p>Erro</p>;
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} style={{ textAlign: 'right' }}>
                <TextField
                    label="Filtrar tipo"
                    name="filter"
                    id="filter-resources"
                    select
                    value={resourceFilter}
                    onChange={handleChangeFilter}
                    variant="outlined"
                    className={classes.filterSize}
                >
                    {resourceTypes.map((resource) => (
                        <MenuItem key={resource.value} value={resource.value}>
                            {resource.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <Paper>
                    <List component="nav">
                        {data.resources.map(
                            (resource, i) =>
                                (resource.type === resourceFilter ||
                                    resourceFilter === 'all') && (
                                    <div key={resource._id}>
                                        <ListItem>
                                            <ListItemText
                                                primary={`Nome do recurso: ${resource.name}`}
                                                classes={{ root: classes.root }}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary={`Tipo do recurso: ${formatResourceType(
                                                    resource.type
                                                )}`}
                                                classes={{ root: classes.root }}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary={formatCost(resource)}
                                                classes={{ root: classes.root }}
                                            />
                                        </ListItem>
                                        {resource.type ===
                                            'physical_spaces' && (
                                            <>
                                                <ListItem>
                                                    <ListItemText
                                                        primary={`Tamanho: ${resource.size}m2`}
                                                        classes={{
                                                            root: classes.root,
                                                        }}
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary={`Quantidade de assentos: ${resource.seat_quantity}`}
                                                        classes={{
                                                            root: classes.root,
                                                        }}
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary={`Custo por assento: R$${currency(
                                                            resource.seat_cost
                                                        )
                                                            .divide(100)
                                                            .format()}`}
                                                        classes={{
                                                            root: classes.root,
                                                        }}
                                                    />
                                                </ListItem>
                                                <ListItem>
                                                    <ListItemText
                                                        primary={`Custo total: R$${currency(
                                                            resource.seat_cost
                                                        )
                                                            .multiply(
                                                                resource.seat_quantity
                                                            )
                                                            .add(
                                                                currency(
                                                                    resource.size
                                                                ).multiply(
                                                                    resource.cost
                                                                )
                                                            )
                                                            .divide(100)
                                                            .format()}`}
                                                        classes={{
                                                            root: classes.root,
                                                        }}
                                                    />
                                                </ListItem>
                                            </>
                                        )}
                                        {data.resources.length !== i + 1 && (
                                            <Divider />
                                        )}
                                    </div>
                                )
                        )}
                    </List>
                </Paper>
            </Grid>
        </Grid>
    );
};
