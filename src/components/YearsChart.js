import React from "react";
import { useSelector } from "react-redux";
import Fade from "react-reveal/Fade";
import theme from "../utility/theme";
import { ThemeProvider } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import { Chart, BarSeries, ArgumentAxis, ValueAxis } from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";

const YearsChart = () => {
    const { repos } = useSelector(state => state.repos);

    const yearsData = () => {
        const years = [];
        repos.forEach(repo => {
            const year = new Date(repo.created_at).getFullYear().toString();
            const existingYearItem = years.find(item => item.year === year);
            if (existingYearItem) {
                const index = years.indexOf(existingYearItem);
                years[index].count++;
            }
            else {
                years.push({ year: year, count: 1 });
            }
        })
        years.sort((a, b) => a.year - b.year);
        return years;
    }

    return (
        <ThemeProvider theme={theme}>
            <Fade left duration={600}>
                <Paper elevation={20} style={{ maxWidth: "120rem", margin: "auto" }}>
                    <Chart data={yearsData()}>
                        <ArgumentAxis />
                        <ValueAxis />
                        <BarSeries valueField="count" argumentField="year" />
                        <Animation duration={1750} />
                    </Chart>
                </Paper>
            </Fade>
        </ThemeProvider>
    )
}

export default YearsChart;