import {
    REPOS_SEARCH_REQUEST,
    REPOS_SEARCH_SUCCESS,
    REPOS_SEARCH_EMPTY,
    REPOS_SEARCH_NOT_FOUND,
    REPOS_CLEAR
} from "../actions/types";

const initialState = {
    user: null,
    repos: null,
    loading: false,
    error: false
}

const reposReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case REPOS_SEARCH_REQUEST:
            return {
                ...state,
                loading: true
            };
        case REPOS_SEARCH_SUCCESS:
            return {
                ...payload,
                loading: false,
                error: false
            };
        case REPOS_SEARCH_EMPTY:
            return {
                ...state,
                user: payload.user,
                loading: false,
                error: true
            };
        case REPOS_SEARCH_NOT_FOUND:
            return {
                ...state,
                loading: false,
                error: true
            };
        case REPOS_CLEAR: {
            return initialState;
        }
        default:
            return state;
    }
}

export default reposReducer;