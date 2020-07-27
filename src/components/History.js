import React from "react";
import moment from "moment";

const History = props => {
    const itemClickHandler = name => {
        props.closed();
        props.itemClicked(name);
    }

    const sortByDate = list => {
        list.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    const listByDate = () => {
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

        return dates.map(dateItem => (
            <div className="history__section" key={dateItem.date}>
                <h3 className="history__date">{dateItem.date}</h3>
                {dateItem.items.map(historyItem => (
                    <p className="history__item" key={historyItem.name}
                        onClick={() => itemClickHandler(historyItem.name)}>
                        {historyItem.name}
                    </p>
                ))}
            </div>
        ))
    }

    return (
        <div>
            {listByDate()}
        </div>
    )
}

export default History;