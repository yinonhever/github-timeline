import {
    HISTORY_ADD_ITEM,
    HISTORY_REMOVE_ITEM,
    HISTORY_CLEAR
} from "../actions/types";
import moment from "moment";

export const addHistoryItem = name => (dispatch, getState) => {
    const { history: { historyItems } } = getState();

    const newHistory = historyItems.filter(item =>
        item.name !== name ||
        moment(item.date).format("LL") !== moment().format("LL")
    );

    newHistory.push({ name: name, date: new Date() });

    dispatch({
        type: HISTORY_ADD_ITEM,
        payload: newHistory
    });

    localStorage.setItem("history", JSON.stringify(newHistory));
}

export const deleteHistoryItem = (name, date) => (dispatch, getState) => {
    const { history: { historyItems } } = getState();

    const newHistory = historyItems.filter(item =>
        item.name !== name ||
        moment(item.date).format("LL") !== moment(date).format("LL")
    );

    dispatch({
        type: HISTORY_REMOVE_ITEM,
        payload: newHistory
    });

    localStorage.setItem("history", JSON.stringify(newHistory));
}

export const clearHistory = () => (dispatch, getState) => {
    const { history: { historyItems } } = getState();
    const confirmed = historyItems.length < 2 ||
        window.confirm("Are you sure you want to delete all history?");
    if (confirmed) {
        dispatch({ type: HISTORY_CLEAR });
        localStorage.setItem("history", JSON.stringify([]));
    }
}