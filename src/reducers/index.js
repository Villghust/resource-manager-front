import { combineReducers } from 'redux';

import { dialogsReducer } from './dialogsReducer';
import { reservationReducer } from './reservationReducer';
import { userReducer } from './userReducer';

const rootReducers = combineReducers({
    reservation: reservationReducer,
    dialogs: dialogsReducer,
    users: userReducer,
});

export default rootReducers;
