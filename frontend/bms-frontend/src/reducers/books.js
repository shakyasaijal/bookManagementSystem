import { POPULAR_BOOKS_FETCH_SUCCESS, POPULAR_BOOKS_FETCH_FAILED, BOOKS_FETCH_SUCCESS, BOOKS_FETCH_FAILED, } from '../actions/types';



const initialState = {
    books: '',
    error: '',
    success: '',
    getBooks: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case POPULAR_BOOKS_FETCH_SUCCESS:
            return {
                ...state,
                books: action.payload,
                error: '',
                success: ''
            }
        case POPULAR_BOOKS_FETCH_FAILED:
            return {
                ...state,
                error: action.payload,
                success: ''
            }
        case BOOKS_FETCH_SUCCESS:
            return {
                ...state,
                getBooks: action.payload,
                error: '',
                success: ''
            }
        case BOOKS_FETCH_FAILED:
            return {
                ...state,
                error: action.payload,
                success: ''
            }
        default:
            return state;
    }
}
