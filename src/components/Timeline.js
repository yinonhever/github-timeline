import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";
import Aux from "../hoc/Auxilliary";
import TimelineRepo from "./TimelineRepo";

const reposPerPage = 10;

const Timeline = () => {
    const { repos } = useSelector(state => state.repos);
    const [page, setPage] = useState(1);
    const [displayedRepos, setDisplayedRepos] = useState([]);

    useEffect(() => {
        const start = (page - 1) * reposPerPage;
        const end = start + reposPerPage;
        setDisplayedRepos(repos.slice(start, end));
    }, [page, repos])

    const pagination =
        <Pagination
            currentPage={page}
            totalSize={repos.length}
            sizePerPage={reposPerPage}
            changeCurrentPage={num => setPage(num)}
            theme="border-bottom"
        />;

    return (
        <Aux>
            {pagination}
            <div className="timeline">
                {displayedRepos.map((repo, index) =>
                    <TimelineRepo
                        key={repo.id}
                        repo={repo}
                        mirror={index % 2 !== 0}
                    />
                )}
            </div >
            {pagination}
        </Aux>
    )
}

export default Timeline;