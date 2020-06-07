import { types } from '../reducers/types';
import api from '../services/api';

export const getInfo = (filter) => async (dispatch) => {
    try {
        dispatch({ type: types.START_UPDATING_RESERVATIONS });
        if (filter === undefined) {
            filter = '';
        }
        const response = await api.get(`/reservations?${filter}`);
        dispatch({
            type: types.FINISH_UPDATING_RESERVATIONS,
            value: response.data.reservations,
        });
    } catch (e) {
        dispatch({
            type: types.ERROR_UPDATING_RESERVATIONS,
            value: e.response.data,
        });
    }
};
