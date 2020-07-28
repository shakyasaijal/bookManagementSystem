import JwtDecode from 'jwt-decode';
import axios from 'axios';

import { REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_FAILED } from '../actions/types';

export const checkTokenExpired = () => async (dispatch, getState) => {
    const isAuth = getState().auth.isAuthenticated;
    console.log(getState().auth)
    if (!isAuth) return '';

    const access = getState().auth.accessToken;
    const refresh = getState().auth.refreshToken;
    const url = getState().getEndPoint

    if (!access) return ';'

    // JwtDecode() returns
    /*
      email: "test@gmail.com"
      expires: "2020-06-23 23:17:09.794487"
      scope: "access"
    */
    // We need expires here.

    const decoded = JwtDecode(access);
    const expired = new Date(decoded.expires);

    // until expired time in minutes
    const untilExpired = (expired - Date.now()) / 1000 / 60;

    if (untilExpired < 1) {
        try {
            const res = await axios.post(`${url}/refresh-at`, { "refreshToken": refresh });
            console.log(res, "is refreshed  ")
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
}
