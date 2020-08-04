import React, { useState, useEffect } from "react";
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
        if (username.trim() === "") {
            setError(true);
        }
        setUsername("");
    }

    useEffect(() => {
        const historyItems = document.getElementsByClassName("history__item-text");
        for (let i = 0; i < historyItems.length; i++) {
            historyItems[i].addEventListener("click", () => setError(false));
        }
    }, [error])

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