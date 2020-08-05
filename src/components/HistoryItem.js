import React from "react";

const HistoryItem = props => (
    <div className="history__item">
        <p className="history__item-text" onClick={() => props.clicked(props.item)}>
            {props.item}
        </p>
        <i className="history__delete far fa-trash-alt" onClick={props.onDelete} />
    </div>
)
export default HistoryItem;