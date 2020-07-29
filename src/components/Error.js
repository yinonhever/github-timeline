import React from "react";

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
        <div className={classes.join(" ")}>
            <i className={"error__icon " + icon} />
            <p className="error__text">{text}</p>
        </div>
    );
}

export default Error;