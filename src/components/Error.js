import React from "react";
import Fade from "react-reveal/Fade";

const Error = props => {
    let classes = ["error"];
    let icon = "fas fa-search";
    let text = "This user has no public repositories.";

    if (props.invalid) {
        classes.push("error--invalid");
        icon = "fas fa-exclamation-circle";
        text = "Oops! Looks like the username is invalid.";
    }

    return (
        <Fade bottom duration={500}>
            <div className={classes.join(" ")}>
                <i className={"error__icon " + icon} />
                <p className="error__text">{text}</p>
            </div>
        </Fade>
    );
}

export default Error;