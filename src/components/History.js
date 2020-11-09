import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Aux from "../hoc/Auxilliary";
import HistoryItem from "./HistoryItem";
import Button from "./Button";
import { deleteHistoryItem, clearHistory } from "../actions/history";
import { searchRepos } from "../actions/repos";
import { HISTORY_HIDE } from "../actions/types";

const History = () => {
    const dispatch = useDispatch();

    const { historyItems, showHistory } = useSelector(state => state.history);

    const closeHandler = () => {
        dispatch({ type: HISTORY_HIDE });
    }

    const itemClickHandler = name => {
        closeHandler();
        dispatch(searchRepos(name));
    }

    const itemDeleteHandler = (name, date) => {
        dispatch(deleteHistoryItem(name, date));
    }

    const clearHandler = () => {
        dispatch(clearHistory());
    }

    const sortByDate = list => {
        list.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    const historyDates = () => {
        const dates = [];
        historyItems.forEach(historyItem => {
            const date = moment(historyItem.date).format("LL");
            const existingDateItem = dates.find(dateItem => dateItem.date === date);
            if (existingDateItem) {
                const index = dates.indexOf(existingDateItem);
                dates[index].items.push(historyItem);
                sortByDate(dates[index].items);
            }
            else {
                dates.push({ date: date, items: [historyItem] });
            }
        })
        sortByDate(dates);
        return dates;
    }

    useEffect(() => {
        document.querySelector("body").style.overflow = showHistory ? "hidden" : null;
    }, [showHistory])

    return (
        <div className={showHistory ? "history active" : "history"}>
            <div className="history__wrapper">
                <div className="history__top">
                    <h1 className="history__heading">Search History</h1>
                    <i className="history__close fas fa-times" onClick={closeHandler} />
                </div>
                {historyItems.length === 0 ?
                    <p className="history__empty">You don't have any searches yet.</p> :
                    <Aux>
                        <div className="history__clear">
                            <Button wide text="Clear history" clicked={clearHandler} />
                        </div>
                        <div className="history__content">
                            {historyDates().map(dateItem => (
                                <div className="history__section" key={dateItem.date}>
                                    <h3 className="history__date">{dateItem.date}</h3>
                                    {dateItem.items.map(historyItem =>
                                        <HistoryItem
                                            key={historyItem.name}
                                            item={historyItem.name}
                                            clicked={itemClickHandler}
                                            onDelete={() =>
                                                itemDeleteHandler(historyItem.name, historyItem.date)}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </Aux>}
            </div>
        </div>
    )
}

export default History;