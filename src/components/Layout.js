import React from "react";
import Aux from "../hoc/Auxilliary";
import Header from "./Header";
import Main from "./Main";
import History from "./History";

const Layout = () => (
    <Aux>
        <Header />
        <Main />
        <History />
    </Aux>
)

export default Layout;