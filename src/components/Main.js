import React from "react";
import User from "./User";
import Content from "./Content";
import Spinner from "./Spinner";
import Error from "./Error";

const Main = props => {
    const { user, repos, loading, error } = props;

    const mainContent = () => {
        if (loading) return <Spinner />;
        else if (error) return <Error invalid={!user} />;
        else if (repos) return <Content repos={repos} />;
    }

    return (
        <main className="main">
            {user && <User name={user.name} avatar={user.avatar} />}
            {mainContent()}
        </main>
    )
}

export default Main;