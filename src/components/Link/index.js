import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

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
