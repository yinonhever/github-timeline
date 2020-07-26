import React from "react";
import Form from "./Form";

const Header = props => (
    <header className="header">
        <Form submit={props.onFormSubmit} />
    </header>
)

export default Header;