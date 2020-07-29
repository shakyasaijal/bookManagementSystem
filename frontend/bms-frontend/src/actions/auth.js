import axios from 'axios';

import {
    USER_LOADING,
    CLEAR_NOTIFICATION_STARTER,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILED,
    START_LOADING,
    STOP_LOADING
} from './types';

export const loadUser = () => async (dispatch, getState) => {
    //User Loading
    dispatch({ type: USER_LOADING });
}


// Login User
export const login = (email, password) => async (dispatch, getState) => {
    const url = getState().getEndPoint;
    dispatch({ type: START_LOADING })

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request Body
    const body = JSON.stringify({ email, password })

    try {
        const res = await axios.post(`${url}/login/`, body, config);
        dispatch({ type: STOP_LOADING })

        if (res.data.status) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        }
        else {
            dispatch({
                type: LOGIN_FAIL,
                payload: res.data.data.message
            })
        }
    } catch (e) {
        dispatch({ type: LOGIN_FAIL, payload: "Connection Problem." });
    }
}


export const logout = () => async (dispatch, getState) => {
    const url = getState().getEndPoint

    // Get token from state
    const access = getState().auth.accessToken;
    const refresh = getState().auth.refreshToken;


    // Request Body
    const body = JSON.stringify({ 'refreshToken': refresh, 'accessToken': access })

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`
        }
    }

    try {
        const res = await axios.post(`${url}/logout/`, body, config);
        if (res.data.status) {
            dispatch({
                type: LOGOUT_SUCCESS,
                payload: res
            });
        }
        else {
            dispatch({
                type: LOGOUT_FAIL,
                payload: res.data.data
            });
        }
    } catch (e) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: e
        })
    }
};


export const signUp = (data) => async (dispatch, getState) => {
    const url = getState().getEndPoint;

    // Start loading for loading styles in frontend.
    dispatch({ type: START_LOADING })
    const body = data;

    try {
        const res = await axios.post(`${url}/register/`, body);
        // Stop loading for loading styles in frontend after data is fetched.
        dispatch({ type: STOP_LOADING })

        if (res.data.status) {
            dispatch({
                type: SIGN_UP_SUCCESS,
                payload: res.data
            });
        }
        else {
            dispatch({
                type: SIGN_UP_FAILED,
                payload: res.data.data.message
            })
        }
    } catch (e) {
        dispatch({ type: SIGN_UP_FAILED, payload: "Something went wrong." });
    }
}

export const clearNotificationStarter = () => async (dispatch, getState) => {
    dispatch({ type: CLEAR_NOTIFICATION_STARTER })
}