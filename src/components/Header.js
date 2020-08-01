import React from "react";
import logo from "../images/logo.png";
import Button from "./Button";
import Form from "./Form";

const Header = props => (
    <header className="header">
        <div className="header__top">
            <a href="/" style={{ display: "block" }}>
                <img className="header__logo" src={logo} alt="logo" />
            </a>
            <Button text="Search history" clicked={props.onShowHistory} />
            <i className="header__history-icon fas fa-history" onClick={props.onShowHistory} />
        </div>
        <p className="header__text">
            Enter a Github username to generate a timeline and a yearly summary of the user's 
            repositories. Only public repositories will be displayed.
        </p>
        <Form submit={props.onFormSubmit} />
    </header>
)

export default Header;