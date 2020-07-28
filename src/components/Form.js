import React, { useState } from "react";
import Button from "./Button";

const Form = props => {
    const [username, setUsername] = useState("");
    const [focused, setFocused] = useState(false);

    const changeHandler = event => {
        setUsername(event.target.value);
    }

    const focusHandler = () => {
        setFocused(!focused);
    }

    const submitHandler = event => {
        event.preventDefault();
        props.submit(username);
        setUsername("");
    }

    return (
        <form className="form" onSubmit={submitHandler}>
            <div className="form__content">
                <div className={focused ? "form__input-wrapper focused" : "form__input-wrapper"}>
                    <input
                        className="form__input"
                        placeholder="Enter a username here..."
                        value={username}
                        onChange={changeHandler}
                        onFocus={focusHandler}
                        onBlur={focusHandler}
                    />
                </div>
                <Button wide big wobble text="Generate" icon="fas fa-location-arrow" />
            </div>
        </form>
    )
}

export default Form;