import React from "react";

const Username = props => (
    props.name ?
        <div className="user-wrapper">
            <div className="user">
                <img className="user__avatar" src={props.avatar} alt="avatar" />
                <h1 className="user__name">{props.name}</h1>
                <div className="user__line" />
            </div>
        </div> :
        null
)

export default Username;