import JwtDecode from 'jwt-decode';
import axios from 'axios';

import { REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILED, LOGOUT_SUCCESS } from '../actions/types';

export const checkTokenExpired = () => async (dispatch, getState) => {
    const access = getState().auth.accessToken;
    const refresh = getState().auth.refreshToken;
    const url = getState().getEndPoint

    if (!refresh) {
        dispatch({ type: LOGOUT_SUCCESS })
        return ''
    }

    // JwtDecode() returns
    /*
      email: "test@gmail.com"
      expires: "2020-06-23 23:17:09.794487"
      scope: "access"
    */

    let flag = false;
    if (access) {
        const decoded = JwtDecode(access);
        const expired = new Date(decoded.expires);

        // until expired time in minutes
        const untilExpired = (expired - Date.now()) / 1000 / 60;
        if(untilExpired < 1){
            flag= true;
        }
    }


    if (flag || !access) {
        try {
            const res = await axios.post(`${url}/refresh-at`, { "refreshToken": refresh });
            if (res.data.status) {
                dispatch({
                    type: REFRESH_TOKEN_SUCCESS,
                    payload: res.data.data
                })
            }
            else {
                dispatch({
                    type: REFRESH_TOKEN_FAILED
                })
            }
        }
        catch (e) {
            dispatch({
                type: REFRESH_TOKEN_FAILED
            })
        }
    }
    return ''
}
