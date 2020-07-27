import {
    LOAD_NOTIFICATION,
    CLEAR_NOTIFICATION
} from './types';


// Load notification
export const loadNotification = (notification, notificationType) => async (dispatch, getState) => {
    dispatch({ type: CLEAR_NOTIFICATION });
    dispatch({ type: LOAD_NOTIFICATION, payload: { notification: notification, notificationType: notificationType } });
}

export const clearNotification = () => async (dispatch, getState) => {
    dispatch({ type: CLEAR_NOTIFICATION });
}