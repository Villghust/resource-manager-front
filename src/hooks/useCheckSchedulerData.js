import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { getInfo } from '../actions/reservationActions';

function useCheckSchedulerData() {
    const dispatch = useDispatch();
    const schedulerState = useSelector((state) => state.reservation);

    useEffect(() => {
        // check if global state has reservations
        if (schedulerState.data === null) {
            dispatch(getInfo({}));
        }
        //eslint-disable-next-line
    }, []);
}

export default useCheckSchedulerData;
