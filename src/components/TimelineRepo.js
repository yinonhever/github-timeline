import React from "react";
import Paper from "@material-ui/core/Paper";
import Button from "./Button";
import Fade from "react-reveal/Fade";
import moment from "moment";

const TimelineRepo = ({ repo, mirror }) => (
    <div className={!mirror ? "timeline__side right" : "timeline__side left"}>
        <Fade duration={600} right mirror={mirror}>
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
)

export default TimelineRepo;