import { types } from './types';

const initialState = {
    addReservation: false,
};

export const dialogsReducer = (state = initialState, { type, value }) => {
    switch (type) {
        case types.HANDLE_DIALOG:
            return {
                ...state,
                ...value,
            };
        default:
            return {
                ...state,
            };
    }
};
