import React from "react";
import Timeline from "./Timeline";
import YearsChart from "./YearsChart";

const Content = props => {
    return (
        <div>
            <Timeline repos={props.repos} />
            <YearsChart repos={props.repos} />
        </div>
    )
}

export default Content;