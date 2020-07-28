import { USER_LOADING, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILED, CLEAR_NOTIFICATION_STARTER, SIGN_UP_SUCCESS, SIGN_UP_FAILED, USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL, AUTH_ERROR, LOGOUT_SUCCESS, LOGOUT_FAIL } from '../actions/types';
import { setCookie, getCookie } from '../services/cookie';

const cookie = getCookie();

const initialState = {
    refreshToken: cookie ? cookie.refresh_token : '',
    accessToken: cookie ? cookie.access_token : '',
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
            setCookie([
                {
                    "name": "access_token",
                    "value": action.payload.data.accessToken,
                    "expiry": 1
                }, {
                    "name": "refresh_token",
                    "value": action.payload.data.refreshToken,
                    "expiry": 30
                }
            ]);
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
            setCookie([
                {
                    "name": "access_token",
                    "value": "",
                    "expiry": 1
                }, {
                    "name": "refresh_token",
                    "value": "",
                    "expiry": 1
                }
            ]);
            return {
                ...state,
                isAuthenticated: false,
                notification: action.payload,
                notificationType: false
            }
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
        case REFRESH_TOKEN_FAILED:
            setCookie([
                {
                    "name": "access_token",
                    "value": "",
                    "expiry": 1
                }, {
                    "name": "refresh_token",
                    "value": "",
                    "expiry": 1
                }
            ]);
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
        case REFRESH_TOKEN_SUCCESS:
            setCookie([
                {
                    "name": "access_token",
                    "value": action.payload.data.accessToken,
                    "expiry": 1
                }
            ]);
            return {
                ...state,
                isAuthenticated: true,
                accessToken: action.payload.data.accessToken
            }
        default:
            return state;
    }
}
