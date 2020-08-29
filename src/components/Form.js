import React, { useState, useEffect, useRef } from "react";
import Paper from "@material-ui/core/Paper";
import Button from "./Button";

const Form = props => {
    const [username, setUsername] = useState("");
    const [focused, setFocused] = useState(false);
    const [error, setError] = useState(false);
    const shouldValidate = useRef(false);

    const changeHandler = event => {
        const { value } = event.target;
        setUsername(value);
        setError(value.trim() === "" && shouldValidate.current);
    }

    const focusHandler = () => {
        setFocused(!focused);
    }

    const submitHandler = event => {
        event.preventDefault();
        props.submit(username.trim());
        shouldValidate.current = username.trim() === "";
        setError(username.trim() === "");
        setUsername("");
    }

    useEffect(() => {
        const historyItems = document.getElementsByClassName("history__item-text");
        for (let i = 0; i < historyItems.length; i++) {
            historyItems[i].addEventListener("click", () => setError(false));
        }
    }, [error])

    return (
        <Paper elevation={24} style={{
            color: "inherit",
            backgroundColor: "transparent"
        }}>
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
        </Paper>
    )
}

export default Form;