import React from "react";

const Username = props => (
    props.name ?
        <div className="username-wrapper">
            <div className="username">
                <h1 className="username__text">{props.name}</h1>
                <div className="username__line" />
            </div>
        </div> :
        null
)

export default Username;