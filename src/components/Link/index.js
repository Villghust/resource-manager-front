import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    root: {
        color: 'white',
        textDecoration: 'none',
    },
});

export const Link = ({ children, ...props }) => {
    const classes = useStyles();

    return (
        <RouterLink className={classes.root} {...props}>
            {children}
        </RouterLink>
    );
};
Link.propTypes = {
    children: PropTypes.element.isRequired,
};
