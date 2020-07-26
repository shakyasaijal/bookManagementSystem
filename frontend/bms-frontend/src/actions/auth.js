import axios from 'axios';

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILED
} from './types';

export const loadUser = () => async (dispatch, getState) => {
    const url = getState().getEndPoint;

    //User Loading
    dispatch({ type: USER_LOADING });

    // Get token from state
    const access = getState().auth.accessToken;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`
        }
    }
    //   try {
    //     const res = await axios.get(`${url}api/v1/users/profile/`, config)
    //     dispatch({
    //       type: USER_LOADED,
    //       payload: res.data
    //     });
    //   }
    //   catch (e) {
    //     console.log(e + " Load error")
    //     // dispatch(returnErrors(err.response.data, err.response.status));
    //     dispatch({ type: AUTH_ERROR });
    //   }

}


// Login User
export const login = (email, password) => async (dispatch, getState) => {
    const url = getState().getEndPoint;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request Body
    const body = JSON.stringify({ email, password })

    try {
        const res = await axios.post(`${url}/login/`, body, config)
        if (res.data.status) {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        }
        else {
            dispatch({
                type: LOGIN_FAIL,
                payload: res.data.data
            })
        }
    } catch (e) {
        console.log(e, "Login Actions")
        dispatch({ type: LOGIN_FAIL, payload: "Something went wrong." });
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


export const signUp = (data) => async(dispatch, getState) => {
    const url = getState().getEndPoint;
    console.log(data)
    const body = data;

    try {
        const res = await axios.post(`${url}/register/`, body)
        if (res.data.status) {
            dispatch({
                type: SIGN_UP_SUCCESS,
                payload: res.data
            });
        }
        else {
            dispatch({
                type: SIGN_UP_FAILED,
                payload: res.data.data
            })
        }
    } catch (e) {
        dispatch({ type: SIGN_UP_FAILED, payload: "Something went wrong." });
    }
}