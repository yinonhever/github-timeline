import React from "react";
import Paper from '@material-ui/core/Paper';
import { Chart, BarSeries, ArgumentAxis, ValueAxis } from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';

const YearsChart = props => {
    const yearsData = () => {
        const newYearsArray = [];
        props.repos.forEach(repo => {
            const year = new Date(repo.created_at).getFullYear().toString();
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
        return newYearsArray;
    }

    return (
        <Paper>
            <Chart data={yearsData()}>
                <ArgumentAxis />
                <ValueAxis/>
                <BarSeries valueField="count" argumentField="year" />
                <Animation />
            </Chart>
        </Paper>
    )
}

export default YearsChart;