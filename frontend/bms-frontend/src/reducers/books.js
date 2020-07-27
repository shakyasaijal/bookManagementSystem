import { POPULAR_BOOKS_FETCH_SUCCESS, POPULAR_BOOKS_FETCH_FAILED, BOOKS_FETCH_SUCCESS, BOOKS_FETCH_FAILED, } from '../actions/types';



const initialState = {
    books: '',
    notification: '',
    notificationType: '',
    getBooks: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case POPULAR_BOOKS_FETCH_SUCCESS:
            return {
                ...state,
                books: action.payload,
            }
        case POPULAR_BOOKS_FETCH_FAILED:
            return {
                ...state,
                notification: action.payload,
                notificationType: false
            }
        case BOOKS_FETCH_SUCCESS:
            return {
                ...state,
                getBooks: action.payload,
            }
        case BOOKS_FETCH_FAILED:
            return {
                ...state,
                notification: action.payload,
                notificationType: false
            }
        default:
            return state;
    }
}
