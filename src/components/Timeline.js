import React from "react";
import Fade from "react-reveal/Fade";
import moment from "moment";
import Button from "./Button";

const Timeline = props => (
    <div className="timeline">
        {props.repos.map((repo, index) => (
            <div className={index % 2 === 0 ? "timeline__side right" : "timeline__side left"}>
                <Fade duration={600} right={index % 2 === 0} left={index % 2 !== 0}>
                    <div className="timeline__card">
                        <h3 className="timeline__title">{repo.name}</h3>
                        <p className="timeline__date">{moment(repo.created_at).format("LL")}</p>
                        <p className="timeline__description">{repo.description}</p>
                        <a rel="noopener noreferrer" href={repo.html_url} target="_blank">
                            <Button wide text="View repository" />
                        </a>
                    </div>
                </Fade>
            </div>
        ))}
    </div>
)

export default Timeline;