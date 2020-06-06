import { types } from '../reducers/types';
import api from '../services/api';

export const getUsers = () => async (dispatch) => {
    try {
        dispatch({ type: types.START_UPDATING_USERS });
        const response = await api.get('/users');
        dispatch({
            type: types.FINISH_UPDATING_USERS,
            value: response.data.users,
        });
    } catch (e) {
        dispatch({ type: types.ERROR_UPDATING_USERS, value: e.response.data });
    }
};
