import React from "react";
import { useDispatch } from "react-redux";
import logo from "../images/logo.png";
import Button from "./Button";
import Form from "./Form";
import { HISTORY_SHOW } from "../actions/types";

const Header = () => {
    const dispatch = useDispatch();

    const openHistoryHandler = () => {
        dispatch({ type: HISTORY_SHOW });
    }

    return (
        <header className="header">
            <div className="header__top">
                <a href="/" style={{ display: "block" }}>
                    <img className="header__logo" src={logo} alt="logo" />
                </a>
                <Button text="Search history" clicked={openHistoryHandler} />
                <i className="header__history-icon fas fa-history" onClick={openHistoryHandler} />
            </div>
            <p className="header__text">
                Enter a Github username to generate a timeline and a yearly summary of the user's
                repositories. Only public repositories will be displayed.
            </p>
            <Form />
        </header>
    )
}

export default Header;