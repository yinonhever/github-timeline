import React from "react";
import User from "./User";
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
            {!props.loading && props.user ?
                <User name={props.user.name} avatar={props.user.avatar} /> : null}
            {mainContent()}
        </main>
    )
}

export default Main;