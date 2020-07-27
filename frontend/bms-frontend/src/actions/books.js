import axios from 'axios';

import {
    POPULAR_BOOKS_FETCH_SUCCESS,
    BOOKS_FETCH_SUCCESS,
    POPULAR_BOOKS_FETCH_FAILED,
    BOOKS_FETCH_FAILED,
    BOOK_FETCH_BY_ID_SUCCESS,
    GET_IMP_DATA_SUCCESS,
    GET_IMP_DATA_FAILED,
    ADD_BOOK_SUCCESS,
    ADD_BOOK_FAILED
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
        dispatch({ type: BOOKS_FETCH_FAILED, payload: "Connection Problem." });
    }
}

export const getBooksById = id => async (dispatch, getState) => {
    const url = getState().getEndPoint;
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.get(`${url}/books/${id}`, config)
        if (res.data.status) {
            dispatch({
                type: BOOK_FETCH_BY_ID_SUCCESS,
                payload: res.data
            });
        }
    } catch (e) {
        if (e.response.status) {
            dispatch({ type: BOOKS_FETCH_FAILED, payload: e.response.data.data.message })
        }
        else {
            dispatch({ type: BOOKS_FETCH_FAILED, payload: "Connection Problem." });
        }
    }
}


export const getImpData = () => async (dispatch, getState) => {
    const url = getState().getEndPoint;
    try {
        const res = await axios.get(`${url}/data-to-add-book`)
        if (res.data.status) {
            dispatch({
                type: GET_IMP_DATA_SUCCESS,
                payload: res.data
            });
        }
    } catch (e) {
        dispatch({ type: GET_IMP_DATA_FAILED, payload: "Connection Problem." });
    }
}


export const addBook = state => async (dispatch, getState) => {
    const url = getState().getEndPoint;

    // Get token from state
    const access = getState().auth.accessToken;
    const refresh = getState().auth.refreshToken;
    let data = new FormData()
    data.append("image", state.image)
    data.append("title", state.title)
    data.append("grade", state.grade)
    data.append("author", JSON.stringify(state.author))
    data.append("description", state.description)
    data.append("subject", JSON.stringify(state.subject))
    data.append("chapter", state.chapter)

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`
        },
    }

    try {
        const res = await axios.post(`${url}/books/`, data, config);
        if (res.data.status) {
            dispatch({
                type: ADD_BOOK_SUCCESS,
                payload: res
            });
        }
        else {
            dispatch({
                type: ADD_BOOK_FAILED,
                payload: res.data.data.message
            });
        }
    } catch (e) {
        dispatch({
            type: ADD_BOOK_FAILED,
            payload: "Connection Problem."
        })
    }
}