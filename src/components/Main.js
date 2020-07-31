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
            {props.user ? <User name={props.user.name} avatar={props.user.avatar} /> : null}
            {mainContent()}
            {/* {props.user &&
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vw",
                    minHeight: "70rem",
                    backgroundColor: "#141c45",
                    opacity: 0.95,
                    zIndex: 9999
                }} />
            } */}
        </main>
    )
}

export default Main;