import React from "react";

const Tabs = props => {
    return (
        props.reposData.map(repo => (
            <div style={{ margin: "3rem" }}>
                <h2>{repo.name}</h2>
                <p>{repo.description}</p>
            </div>
        ))
    )
}

export default Tabs;