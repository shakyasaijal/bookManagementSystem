import { POPULAR_BOOKS_FETCH_SUCCESS, SEARCH_SUCCESS, SEARCH_FAILED, ADD_BOOK_FAILED, ADD_BOOK_SUCCESS, GET_IMP_DATA_SUCCESS, BOOK_FETCH_BY_ID_SUCCESS, POPULAR_BOOKS_FETCH_FAILED, BOOKS_FETCH_SUCCESS, BOOKS_FETCH_FAILED, } from '../actions/types';



const initialState = {
    books: '',
    notification: '',
    notificationType: '',
    getBooks: '',
    bookById: '',
    subject: [],
    author: [],
    searchData: null,
    allGrades: null,
    allSubjects: null,
    allChapters: null
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
            return {
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
            return {
                ...state,
                notification: action.payload,
                notificationType: false
            }
        case SEARCH_SUCCESS:
            return {
                ...state,
                searchData: action.payload.data.data,
                allSubjects: action.payload.data.subjects,
                allGrades: action.payload.data.grades,
                allChapters: action.payload.data.chapters
            }
        case SEARCH_FAILED:
            return {
                ...state,
                searchData: null,
                notificationType: false,
                notification: action.payload
            }
        default:
            return state;
    }
}
