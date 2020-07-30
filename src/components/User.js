import React from "react";
import Zoom from "react-reveal/Zoom";

const User = props => (
    <Zoom duration={400}>
        <div className="user-wrapper">
            <div className="user">
                <img className="user__avatar" src={props.avatar} alt="avatar" />
                <h1 className="user__name">{props.name}</h1>
                <div className="user__line" />
            </div>
        </div>
    </Zoom>
)

export default User;