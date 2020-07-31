import React from "react";

const Chart = props => {
    const yearsData = () => {
        const newYearsArray = [];
        props.repos.forEach(repo => {
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
        return newYearsArray;
    }

    return (
        {}
    )
}

export default Chart;