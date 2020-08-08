import React, { useState } from "react";
import Aux from "../hoc/Auxilliary";
import Timeline from "./Timeline";
import YearsChart from "./YearsChart";
import theme from "../utility/theme";
import PropTypes from "prop-types";
import { ThemeProvider } from "@material-ui/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import EqualizerIcon from '@material-ui/icons/Equalizer';
import TimelineIcon from '@material-ui/icons/Timeline';
import Box from '@material-ui/core/Box';

const TabPanel = props => {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3} style={{ padding: 0 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const a11yProps = index => ({
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
})

const Content = props => {
    const [value, setValue] = useState(0);

    const changeHandler = (event, newValue) => {
        setValue(newValue);
    }

    return (
        <Aux>
            <ThemeProvider theme={theme}>
                <AppBar position="static" className="tabs">
                    <Tabs variant="fullWidth" value={value} onChange={changeHandler}>
                        <Tab label="Timeline" icon={<TimelineIcon />} className="tab" {...a11yProps(0)} />
                        <Tab label="Yearly Chart" icon={<EqualizerIcon />} className="tab" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
            </ThemeProvider>
            <TabPanel value={value} index={0}>
                <Timeline repos={props.repos} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <YearsChart repos={props.repos} />
            </TabPanel>
        </Aux>
    )
}

export default Content;