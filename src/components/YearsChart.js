import React from "react";
import theme from "./theme";
import { ThemeProvider } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import { Chart, BarSeries, ArgumentAxis, ValueAxis } from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";

const YearsChart = props => {
    const yearsData = () => {
        const years = [];
        props.repos.forEach(repo => {
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
            <Paper elevation={20} style={{ maxWidth: "120rem", margin: "auto" }}>
                <Chart data={yearsData()}>
                    <ArgumentAxis />
                    <ValueAxis />
                    <BarSeries valueField="count" argumentField="year" />
                    <Animation duration={1500} />
                </Chart>
            </Paper>
        </ThemeProvider>
    )
}

export default YearsChart;