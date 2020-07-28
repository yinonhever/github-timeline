import React from "react";

const Button = props => {
    let classes = ["button", "hvr-radial-out"];
    if (props.wide) {
        classes.push("button--wide");
    }
    if (props.big) {
        classes.push("button--big");
    }
    if (props.wobble) {
        classes.push("hvr-wobble-to-top-right");
    }

    return (
        <button className={classes.join(" ")} onClick={props.clicked ? props.clicked : null}>
            <span className="button__text">{props.text}</span>
            {props.icon ? <i className={"button__icon hvr-icon " + props.icon} /> : null}
        </button>
    )
}

export default Button;