import { USER_LOADING, SIGN_UP_SUCCESS, SIGN_UP_FAILED, USER_LOADED, LOAD_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, AUTH_ERROR, LOGOUT_SUCCESS, LOGOUT_FAIL } from '../actions/types';



const initialState = {
    refreshToken: localStorage.getItem('refreshToken'),
    accessToken: localStorage.getItem('accessToken'),
    isAuthenticated: null,
    isLoading: false,
    user_id: localStorage.getItem('user_id'),
    error: '',
    success: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            if (state.accessToken) {
                return {
                    ...state,
                    isLoading: true,
                    isAuthenticated: true,
                    success: '',
                    error: ''
                };
            } else {
                return {
                    ...state,
                    isLoading: true,
                    success: '',
                    error: ''
                };
            }
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                success: '',
                error: ''
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
                success: '',
                error: ''
            };
        case LOGIN_FAIL:
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
                error: action.payload.message,
                success: ''
            };
        case LOGOUT_FAIL:
            return {
                ...state,
                error: action.payload,
                success: ''
            }
        case LOAD_ERROR:
        case SIGN_UP_FAILED:
            return {
                ...state,
                error: action.payload,
                success: ''
            }
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                success: 'Your are successfully signed up.',
                error: ''
            }
        default:
            return state;
    }
}
