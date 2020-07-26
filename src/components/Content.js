import React from "react";

const Content = props => {
    return (
        props.reposData.map(repo => (
            <div key={repo.id} style={{ margin: "3rem" }}>
                <h2>{repo.name}</h2>
                <p>{repo.description}</p>
            </div>
        ))
    )
}

export default Content;