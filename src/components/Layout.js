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
    const [years, setYears] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [history, setHistory] = usePersistedState("history", []);
    const [modalActive, setModalActive] = useState(false);

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
                            setUser({ name: input, avatar: matchingProfile.avatar_url });
                            const newRepos = response.data;
                            newRepos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                            setRepos(newRepos);
                            createYearsData(newRepos);
                            updateHistory(input);

                            if (newRepos.length > 0) {
                                setError(false);
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

    const createYearsData = newRepos => {
        const newYearsArray = [];

        newRepos.forEach(repo => {
            const year = new Date(repo.created_at).getFullYear();
            const existingYearItem = newYearsArray.find(item => item.year === year);
            if (existingYearItem) {
                const index = newYearsArray.indexOf(existingYearItem);
                newYearsArray[index].count++;
            }
            else {
                newYearsArray.push({ year: year, count: 1 });
            }
        })

        newYearsArray.sort((a, b) => a.year - b.year);
        setYears(newYearsArray);
    }

    const updateHistory = input => {
        const newHistory = history.filter(item =>
            item.name.toLowerCase() !== input.toLowerCase() ||
            moment(item.date).format("LL") !== moment().format("LL"));
        newHistory.push({ name: input, date: new Date() });
        setHistory(newHistory);
    }

    const modalHandler = () => {
        setModalActive(!modalActive);
    }

    const itemDeleteHandler = name => {
        setHistory(history => history.filter(item => item.name.toLowerCase() !== name.toLowerCase()));
    }

    const clearHandler = () => {
        setHistory([]);
    }

    return (
        <Aux>
            <Header
                onFormSubmit={submitHandler}
                onShowHistory={modalHandler}
            />
            <Main
                user={user}
                repos={repos}
                years={years}
                loading={loading}
                error={error}
            />
            <History
                active={modalActive}
                closed={modalHandler}
                history={history}
                itemClicked={submitHandler}
                itemDeleted={itemDeleteHandler}
                cleared={clearHandler}
            />
        </Aux>
    )
}

export default Layout;