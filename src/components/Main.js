import React from "react";
import { useSelector } from "react-redux";
import User from "./User";
import Content from "./Content";
import Spinner from "./Spinner";
import Error from "./Error";

const Main = () => {
    const { user, repos, loading, error } = useSelector(state => state.repos);

    return (
        <main className="main">
            {user && <User name={user.name} avatar={user.avatar} />}
            {loading ? <Spinner /> :
                error ? <Error invalid={!user} /> :
                    repos && <Content />}
        </main>
    )
}

export default Main;