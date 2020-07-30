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
    ADD_BOOK_FAILED,
    SEARCH_FAILED,
    SEARCH_SUCCESS,
    DELETE_FAILED,
    DELETE_SUCCESS,
    EDIT_BOOK_FAILED,
    EDIT_BOOK_SUCCESS,
    START_LOADING,
    STOP_LOADING
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
    dispatch({ type: START_LOADING })

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.get(`${url}/books/`, config);
        dispatch({ type: STOP_LOADING })

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
    dispatch({ type: START_LOADING })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.get(`${url}/books/${id}`, config);
        dispatch({ type: STOP_LOADING })

        if (res.data.status) {
            dispatch({
                type: BOOK_FETCH_BY_ID_SUCCESS,
                payload: res.data
            });
        }
        else{
            dispatch({
                type: BOOKS_FETCH_FAILED,
                payload: "Data not found."
            })
        }
    } catch (e) {
        dispatch({ type: STOP_LOADING })
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
    dispatch({ type: START_LOADING })

    try {
        const res = await axios.get(`${url}/data-to-add-book`);
        dispatch({ type: STOP_LOADING })

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
    dispatch({ type: START_LOADING })

    // Get token from state
    const access = getState().auth.accessToken;
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
        dispatch({ type: STOP_LOADING })
        if (res.data.status) {
            dispatch({
                type: ADD_BOOK_SUCCESS,
                payload: res.data.data
            });
        }
        else {
            dispatch({
                type: ADD_BOOK_FAILED,
                payload: res.data.data.message
            });
        }
    } catch (e) {
        dispatch({ type: STOP_LOADING })

        dispatch({
            type: ADD_BOOK_FAILED,
            payload: "Connection Problem."
        })
    }
}


export const searchBooks = (searchFor, grades, subjects, chapters) => async (dispatch, getState) => {
    const url = getState().getEndPoint;
    dispatch({ type: START_LOADING })

    const body = JSON.stringify();

    try {
        const res = await axios.post(`${url}/search/`, { "search": searchFor, "filters": { "grades": grades, "subjects": subjects, "chapters": chapters } });
        dispatch({ type: STOP_LOADING })
        if (res.data.status) {
                dispatch({
                    type: SEARCH_SUCCESS,
                    payload: res.data
                })
            }
    }
    catch (e) {
        dispatch({
            type: SEARCH_FAILED,
            payload: "Connection Problem."
        })
    }

}


export const deleteBook = (id) => async (dispatch, getState) => {
    const url = getState().getEndPoint;
    const access = getState().auth.accessToken;
    dispatch({ type: START_LOADING })
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`
        }
    }

    try {
        const res = await axios.delete(`${url}/books/${id}`, config);
        dispatch({ type: STOP_LOADING })
        
        if (res.data.status) {
            dispatch({
                type: DELETE_SUCCESS,
                payload: "Book successfully deleted."
            })
        }
        else {
            dispatch({
                type: DELETE_FAILED,
                payload: res.data.data.message
            })
        }
    }
    catch (e) {
        console.log(e, "catch")
        dispatch({
            type: DELETE_FAILED,
            payload: "Connection Problem."
        })
    }
}


export const editBook = state => async (dispatch, getState) => {
    const url = getState().getEndPoint;
    const access = getState().auth.accessToken;
    dispatch({ type: START_LOADING })



    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access}`
        },
    }

    let data = new FormData()
    data.append("title", state.title)
    data.append("grade", state.grade)
    data.append("author", JSON.stringify(state.author))
    data.append("description", state.description)
    data.append("subject", JSON.stringify(state.subject))
    data.append("chapter", state.chapter)

    if (state.image) {
        data.append("image", state.image)
    }

    try {
        const res = await axios.put(`${url}/books/${state.id}/`, data, config);
        dispatch({ type: STOP_LOADING })
        
        if (res.data.status) {
            dispatch({
                type: EDIT_BOOK_SUCCESS,
                payload: res
            });
        }
        else {
            dispatch({
                type: EDIT_BOOK_FAILED,
                payload: res.data.data.message
            });
        }
    } catch (e) {
        dispatch({
            type: EDIT_BOOK_FAILED,
            payload: "Connection Problem."
        })
    }

}