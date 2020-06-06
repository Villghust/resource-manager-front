import { types } from './types';

const initialState = {
    loading: true,
    error: false,
    data: null,
};

export const userReducer = (state = initialState, { type, value }) => {
    switch (type) {
        case types.START_UPDATING_USERS:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case types.FINISH_UPDATING_USERS:
            return {
                ...state,
                loading: false,
                error: false,
                data: value,
            };
        case types.ERROR_UPDATING_USERS:
            return {
                ...state,
                loading: false,
                error: true,
                data: null,
            };
        default:
            return { ...state };
    }
};
