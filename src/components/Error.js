import React from "react";
import Zoom from "react-reveal/Zoom";

const Error = props => {
    let content;
    if(props.invalid) {
        content = <p style={{width: "100%", textAlign: "center"}}>Oops! Looks like the username is invalid.</p>
    }
    else {
        content = <p style={{width: "100%", textAlign: "center"}}>This user has no public repositories.</p>
    }

    return <Zoom duration={400}>{content}</Zoom>;
}

export default Error;