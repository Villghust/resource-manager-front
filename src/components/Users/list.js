import React from 'react';
import {
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
} from '@material-ui/core';
import useApiRequest from '../../hooks/useApiRequest';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import {Skeleton} from "@material-ui/lab"

const useStyles = makeStyles({
    root: {
        wordWrap: 'break-word',
    },
});

export const ListUsers = () => {
    const classes = useStyles();

    const { data, loading, error } = useApiRequest(true, '/users');

    if (loading) {
        return (
            <Skeleton variant="rect" height={250} />
        );
    }

    return (
        <Paper>
            <List component="nav">
                {data.users.map((user, i) => (
                    <div key={user._id}>
                        <ListItem>
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={user.name}
                                classes={{ root: classes.root }}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <EmailIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={user.email}
                                classes={{ root: classes.root }}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <Icon
                                    className="far fa-id-badge"
                                    style={{ textAlign: 'center' }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={user.registration}
                                classes={{ root: classes.root }}
                            />
                        </ListItem>
                        {data.users.length !== i + 1 && <Divider />}
                    </div>
                ))}
            </List>
        </Paper>
    );
};
