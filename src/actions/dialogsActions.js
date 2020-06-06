import { types } from '../reducers/types';

export const handleDialog = (state) => (dispatch) => {
    dispatch({ type: types.HANDLE_DIALOG, value: state });
};
