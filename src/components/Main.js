import React from "react";
import Username from "./Username";
import Content from "./Content";
import Spinner from "./Spinner";
import Error from "./Error";

const Main = props => {
    const mainContent = () => {
        if (props.loading) {
            return <Spinner />
        }
        else {
            if (props.error) {
                return <Error invalid={!props.repos} />
            }
            else if (props.repos) {
                return <Content repos={props.repos} years={props.years} />
            }
        }
    }

    return (
        <main className="main">
            {!props.loading && props.repos ?
                <Username name={props.username} /> : null}
            {mainContent()}
        </main>
    )
}

export default Main;