import React from "react";
import moment from "moment";

const Content = props => {
    return (
        props.reposData.map(repo => (
            <div key={repo.id} style={{ margin: "3rem" }}>
                <h2>{repo.name}</h2>
                <p style={{ fontSize: "1.2rem" }}>{moment(repo.created_at).format("LL")}</p>
                <p>{repo.description}</p>
            </div>
        ))
    )
}

export default Content;