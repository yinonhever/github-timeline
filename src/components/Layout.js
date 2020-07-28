import React, { useState, useEffect } from "react";
import usePersistedState from "../usePersistedState";
import axios from "axios";
import Aux from "../hoc/Auxilliary";
import Header from "./Header";
import Username from "./Username";
import Content from "./Content";
import Spinner from "./Spinner";
import Error from "./Error";
import History from "./History";

const Layout = () => {
    const [repos, setRepos] = useState(null);
    const [years, setYears] = useState(null);
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [history, setHistory] = usePersistedState("history", []);
    const [modalActive, setModalActive] = useState(false);

    useEffect(() => {
        console.log(history);
    }, [history])

    const submitHandler = input => {
        setRepos(null);
        setLoading(true);
        setUsername(input);

        axios.get("https://api.github.com/users/" + input + "/repos?page=1&per_page=100")
            .then(response => {
                setLoading(false);
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
            .catch(() => {
                setLoading(false);
                setError(true);
            })
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
        const newHistory = history.filter(item => item.name !== input);
        newHistory.push({ name: input, date: new Date() });
        setHistory(newHistory);
    }

    const modalHandler = () => {
        setModalActive(!modalActive);
    }

    const itemDeleteHandler = name => {
        setHistory(history => history.filter(item => item.name !== name));
    }

    const clearHandler = () => {
        setHistory([]);
    }

    const mainContent = () => {
        if (loading) {
            return <Spinner />
        }
        else {
            if (error) {
                return <Error invalid={!repos} />
            }
            else if (repos) {
                return <Content reposData={repos} yearsData={years} />
            }
        }
    }

    return (
        <Aux>
            <Header onFormSubmit={submitHandler} onShowHistory={modalHandler} />
            {!loading ? <Username name={username} /> : null}
            {mainContent()}
            {/* <History
                active={modalActive}
                closed={modalHandler}
                history={history}
                itemClicked={submitHandler}
                itemDeleted={itemDeleteHandler}
                cleared={clearHandler}
            /> */}
        </Aux>
    )
}

export default Layout;