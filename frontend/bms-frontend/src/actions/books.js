import axios from 'axios';

import {
    POPULAR_BOOKS_FETCH_SUCCESS,
    BOOKS_FETCH_SUCCESS,
    POPULAR_BOOKS_FETCH_FAILED,
    BOOKS_FETCH_FAILED,
} from './types';



// Get popular books
export const popularBooks = () => async (dispatch, getState) => {
    const url = getState().getEndPoint;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.get(`${url}/popular-books`, config)
        if (res.data.status) {
            dispatch({
                type: POPULAR_BOOKS_FETCH_SUCCESS,
                payload: res.data
            });
        }
        else {
            dispatch({
                type: POPULAR_BOOKS_FETCH_FAILED,
                payload: "Something went wrong."
            })
        }
    } catch (e) {
        dispatch({ type: POPULAR_BOOKS_FETCH_FAILED, payload: "Something went wrong." });
    }
}

// Get latest books
export const getBooks = () => async (dispatch, getState) => {
    const url = getState().getEndPoint;

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.get(`${url}/books/`, config)
        if (res.data.status) {
            dispatch({
                type: BOOKS_FETCH_SUCCESS,
                payload: res.data
            });
        }
        else {
            dispatch({
                type: BOOKS_FETCH_FAILED,
                payload: "Something went wrong."
            })
        }
    } catch (e) {
        dispatch({ type: BOOKS_FETCH_FAILED, payload: "Something went wrong." });
    }
}
