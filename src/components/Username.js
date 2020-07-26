import React from "react";

const Username = props => (
    props.name ?
        <div style={{ width: "100%", textAlign: "center" }}>
            <h1 style={{ padding: "1.5rem", margin: "3rem", border: "1px solid", display: "inline-block" }}>
                {props.name}
            </h1>
        </div> :
        null
)

export default Username;