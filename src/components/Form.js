import React, { useState } from "react";
import Button from "./Button";

const Form = props => {
    const [username, setUsername] = useState("");
    const [focused, setFocused] = useState(false);
    const [error, setError] = useState(false);

    const changeHandler = event => {
        setUsername(event.target.value);
        if (event.target.value.trim() !== "") {
            setError(false);
        }
    }

    const focusHandler = () => {
        setFocused(!focused);
    }

    const submitHandler = event => {
        event.preventDefault();
        props.submit(username.trim());
        setUsername("");
        
        if (username.trim() === "") {
            setError(true);
        }
    }

    return (
        <form className={!error ? "form" : "form form--error"} onSubmit={submitHandler}>
            <div className={"form__content"}>
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