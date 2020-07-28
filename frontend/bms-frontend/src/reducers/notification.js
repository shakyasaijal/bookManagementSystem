import { LOAD_NOTIFICATION, CLEAR_NOTIFICATION } from '../actions/types';



const initialState = {
    notification: '',
    type: true
};

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_NOTIFICATION:
            return {
                ...state,
                notification: action.payload.notification,
                type: action.payload.notificationType
            }
        case CLEAR_NOTIFICATION:
            return {
                ...state,
                notification: ''
            }
        default:
            return state;
    }
}
