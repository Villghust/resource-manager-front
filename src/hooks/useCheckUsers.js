import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUsers } from '../actions/userActions';

function useCheckUsers() {
    const dispatch = useDispatch();
    const usersState = useSelector((state) => state.users);

    useEffect(() => {
        // check if global state has users
        if (usersState.data === null) {
            dispatch(getUsers());
        }
        //eslint-disable-next-line
    }, []);
}

export default useCheckUsers;
