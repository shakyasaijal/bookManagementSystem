import { USER_LOADING, CLEAR_NOTIFICATION_STARTER,SIGN_UP_SUCCESS, SIGN_UP_FAILED, USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL, AUTH_ERROR, LOGOUT_SUCCESS, LOGOUT_FAIL } from '../actions/types';



const initialState = {
    refreshToken: localStorage.getItem('refreshToken'),
    accessToken: localStorage.getItem('accessToken'),
    isAuthenticated: null,
    isLoading: false,
    user_id: localStorage.getItem('user_id'),
    notification: '',
    notificationType: true //Success else false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            if (state.accessToken) {
                return {
                    ...state,
                    isLoading: true,
                    isAuthenticated: true,
                };
            } else {
                return {
                    ...state,
                    isLoading: true,
                };
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('user_id', action.payload.data.id);
            localStorage.setItem('accessToken', action.payload.data.accessToken);
            localStorage.setItem('refreshToken', action.payload.data.refreshToken);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                accessToken: action.payload.data.accessToken,
                refreshToken: action.payload.data.refreshToken,
                notification: 'Login Success.',
                notificationType: true
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                notification: action.payload,
                notificationType: false
            }
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user_id');
            return {
                ...state,
                token: null,
                user_id: null,
                isAuthenticated: false,
                isLoading: false,
                notification: '',
                notificationType: false
            };
        case LOGOUT_FAIL:
            return {
                ...state,
                notification: action.payload,
                notificationType: false
            }
        case SIGN_UP_FAILED:
                return {
                ...state,
                notification: action.payload,
                notificationType: false
            }
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                notification: 'Your are successfully signed up.',
                notificationType: true
            }
        case CLEAR_NOTIFICATION_STARTER:
            return {
                ...state,
                notification: '',
                notificationType: ''
            }
        default:
            return state;
    }
}
