import React from "react";
import Timeline from "./Timeline";

const Content = props => {
    return (
        <Timeline repos={props.repos} />
    )
}

export default Content;