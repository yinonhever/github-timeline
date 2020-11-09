import {
    HISTORY_ADD_ITEM,
    HISTORY_REMOVE_ITEM,
    HISTORY_CLEAR,
    HISTORY_SHOW,
    HISTORY_HIDE
} from "../actions/types";

const initialState = {
    historyItems: JSON.parse(localStorage.getItem("history")) || [],
    showHistory: false
}

const historyReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case HISTORY_ADD_ITEM:
        case HISTORY_REMOVE_ITEM:
            return {
                ...state,
                historyItems: payload
            };
        case HISTORY_CLEAR:
            return {
                ...state,
                historyItems: []
            };
        case HISTORY_SHOW:
            return {
                ...state,
                showHistory: true
            };
        case HISTORY_HIDE:
            return {
                ...state,
                showHistory: false
            };
        default:
            return state;
    }
}

export default historyReducer;