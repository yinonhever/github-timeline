import React from "react";
import logo from "../images/logo.png";
import Button from "./Button";
import Form from "./Form";

const Header = props => (
    <header className="header">
        <div className="header__top">
            <img className="header__logo" src={logo} alt="logo" />
            <Button clicked={props.onShowHistory} text="Search history" />
        </div>
        <p className="header__text">
            Enter a Github username to generate a timeline and a yearly summary of the user's repositories.
            Only public repositories will be displayed.
        </p>
        <Form submit={props.onFormSubmit} />
    </header>
)

export default Header;