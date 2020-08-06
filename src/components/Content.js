import React from "react";
import Aux from "../hoc/Auxilliary";
import Timeline from "./Timeline";
import YearsChart from "./YearsChart";

const Content = props => {
    return (
        <Aux>
            <Timeline repos={props.repos} />
            <YearsChart repos={props.repos} />
        </Aux>
    )
}

export default Content;