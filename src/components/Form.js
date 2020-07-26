import React, { useState } from "react";

const Form = props => {
    const [username, setUsername] = useState("");

    const changeHandler = event => {
        setUsername(event.target.value);
    }

    const submitHandler = event => {
        event.preventDefault();

        if (username !== "") {
            props.submit(username);
            setUsername("");
        }
    }

    return (
        <form className="form" onSubmit={submitHandler}>
            <input
                className="form__input"
                placeholder="Enter a username here..."
                value={username}
                onChange={changeHandler}
            />
            <button className="button">Generate</button>
        </form>
    )
}

export default Form;