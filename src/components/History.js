import React, { useEffect } from "react";
import moment from "moment";
import Aux from "../hoc/Auxilliary";
import HistoryItem from "./HistoryItem";
import Button from "./Button";

const History = props => {
    useEffect(() => {
        const body = document.querySelector("body").style;
        if (props.active) {
            body.overflow = "hidden";
        }
        else {
            body.overflow = null;
        }
    }, [props.active])

    const itemClickHandler = name => {
        props.closed();
        props.itemClicked(name);
    }

    const sortByDate = list => {
        list.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    const historyDates = () => {
        const dates = [];
        props.history.forEach(historyItem => {
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

    return (
        <div className={!props.active ? "history" : "history active"}>
            <div className="history__wrapper">
                <div className="history__top">
                    <h1 className="history__heading">Search History</h1>
                    <i className="history__close fas fa-times" onClick={props.closed} />
                </div>
                {props.history.length === 0 ?
                    <p className="history__empty">You don't have any searches yet.</p> :
                    <Aux>
                        <div className="history__clear">
                            <Button wide text="Clear history" clicked={props.cleared} />
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
                                            onDelete={props.itemDeleted}
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