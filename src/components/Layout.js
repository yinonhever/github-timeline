import React, { useState } from "react";
import usePersistedState from "../usePersistedState";
import axios from "axios";
import moment from "moment";
import Aux from "../hoc/Auxilliary";
import Header from "./Header";
import Main from "./Main";
import History from "./History";

const Layout = () => {
    const [user, setUser] = useState(null);
    const [repos, setRepos] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [history, setHistory] = usePersistedState("history", []);
    const [showHistory, setShowHistory] = useState(false);

    const submitHandler = input => {
        setUser(null);
        setRepos(null);
        setError(false);

        if (input !== "") {
            setLoading(true);

            axios.get("https://api.github.com/users/" + input + "/repos?page=1&per_page=100")
                .then(response => {
                    axios.get("https://api.github.com/search/users?q=" + input)
                        .then(res => {
                            setLoading(false);
                            const matchingProfile = res.data.items.find(item =>
                                item.login.toLowerCase() === input.toLowerCase());

                            if (matchingProfile) {
                                setUser({
                                    name: matchingProfile.login,
                                    avatar: matchingProfile.avatar_url
                                });
                                updateHistory(matchingProfile.login);
                                const newRepos = response.data;
                                newRepos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                                setRepos(newRepos);

                                if (newRepos.length === 0) {
                                    setError(true);
                                }
                            }
                            else {
                                setError(true);
                            }
                        })
                })
                .catch(() => {
                    setLoading(false);
                    setError(true);
                })
        }
    }

    const updateHistory = name => {
        const newHistory = history.filter(item =>
            item.name !== name ||
            moment(item.date).format("LL") !== moment().format("LL"));
        newHistory.push({ name: name, date: new Date() });
        setHistory(newHistory);
    }

    const showHistoryHandler = () => {
        setShowHistory(!showHistory);
    }

    const itemDeleteHandler = name => {
        setHistory(history => history.filter(item => item.name !== name));
    }

    const clearHandler = () => {
        setHistory([]);
    }

    return (
        <Aux>
            <Header
                onFormSubmit={submitHandler}
                onShowHistory={showHistoryHandler}
            />
            <Main
                user={user}
                repos={repos}
                loading={loading}
                error={error}
            />
            <History
                active={showHistory}
                closed={showHistoryHandler}
                history={history}
                itemClicked={submitHandler}
                itemDeleted={itemDeleteHandler}
                cleared={clearHandler}
            />
        </Aux>
    )
}

export default Layout;