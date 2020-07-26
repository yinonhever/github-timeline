import React, { useState } from "react";
import axios from "axios";
import Aux from "../hoc/Auxilliary";
import Header from "./Header";
import Username from "./Username";
import Content from "./Content";
import Spinner from "./Spinner";
import Error from "./Error";

const Layout = () => {
    const [repos, setRepos] = useState(null);
    const [years, setYears] = useState(null);
    const [username, setUsername] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const submitHandler = input => {
        setRepos(null);
        setLoading(true);
        setError(false);
        setUsername(input);

        axios.get("https://api.github.com/users/" + input + "/repos")
            .then(response => {
                setLoading(false);
                const newRepos = response.data;
                newRepos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setRepos(newRepos);
                createYearsData(newRepos);

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
                newYearsArray[index] = {
                    year: year,
                    count: newYearsArray[index].count + 1
                }
            }
            else {
                newYearsArray.push({ year: year, count: 1 });
            }
        })

        newYearsArray.sort((a, b) => a.year - b.year);
        setYears(newYearsArray);
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
            <Header onFormSubmit={submitHandler} />
            <Username name={username} />
            {mainContent()}
        </Aux>
    )
}

export default Layout;