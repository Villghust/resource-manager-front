import { types } from './types';

const initialState = {
    loading: true,
    error: false,
    data: null,
};

export const reservationReducer = (state = initialState, { type, value }) => {
    switch (type) {
        case types.START_UPDATING_RESERVATIONS:
            return {
                ...state,
                error: false,
                loading: true,
            };
        case types.FINISH_UPDATING_RESERVATIONS:
            return {
                ...state,
                error: false,
                loading: false,
                data: value,
            };
        case types.ERROR_UPDATING_RESERVATIONS:
            return {
                ...state,
                error: true,
                loading: false,
            };
        default:
            return { ...state };
    }
};
