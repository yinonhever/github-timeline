import React from "react";
import { useSelector } from "react-redux";
import Fade from "react-reveal/Fade";
import moment from "moment";
import Paper from "@material-ui/core/Paper";
import Button from "./Button";

const Timeline = () => {
    const { repos } = useSelector(state => state.repos);

    return (
        <div className="timeline">
            {repos.map((repo, index) => (
                <div className={index % 2 === 0 ? "timeline__side right" : "timeline__side left"}
                    key={repo.id}>
                    <Fade duration={600} right={index % 2 === 0} left={index % 2 !== 0}>
                        <Paper elevation={15} style={{
                            color: "inherit",
                            backgroundColor: "transparent"
                        }}>
                            <div className="timeline__card">
                                <h3 className="timeline__title">{repo.name}</h3>
                                <div className="timeline__date">
                                    <i className="timeline__date-icon far fa-clock" />
                                    <p className="timeline__date-text">
                                        {moment(repo.created_at).format("LL")}
                                    </p>
                                </div>
                                <p className="timeline__description">{repo.description}</p>
                                <a rel="noopener noreferrer" href={repo.html_url} target="_blank">
                                    <Button wide text="View repository" icon="fas fa-long-arrow-alt-right" />
                                </a>
                            </div>
                        </Paper>
                    </Fade>
                </div>
            ))}
        </div >
    )
}

export default Timeline;