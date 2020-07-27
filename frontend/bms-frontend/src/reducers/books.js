import { POPULAR_BOOKS_FETCH_SUCCESS, ADD_BOOK_FAILED, ADD_BOOK_SUCCESS, GET_IMP_DATA_SUCCESS, BOOK_FETCH_BY_ID_SUCCESS, POPULAR_BOOKS_FETCH_FAILED, BOOKS_FETCH_SUCCESS, BOOKS_FETCH_FAILED, } from '../actions/types';



const initialState = {
    books: '',
    notification: '',
    notificationType: '',
    getBooks: '',
    bookById: '',
    subject: [],
    author: []
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
                notification: '',
                notificationType: true
            }
        case BOOKS_FETCH_FAILED:
            return {
                ...state,
                notification: action.payload,
                notificationType: false
            }
        case BOOK_FETCH_BY_ID_SUCCESS:
            return {
                ...state,
                bookById: action.payload,
                notification: '',
                notificationType: true
            }
        case GET_IMP_DATA_SUCCESS:
            return{
                ...state,
                subject: action.payload.data.allSubjects,
                author: action.payload.data.allAuthor
            }
        case ADD_BOOK_SUCCESS:
            return {
                ...state,
                notification: action.payload,
                notificationType: true
            }
        case ADD_BOOK_FAILED:
            return{
                ...state,
                notification: action.payload,
                notificationType: false
            }
        default:
            return state;
    }
}
