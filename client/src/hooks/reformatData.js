const reformatData = (in_labels, in_data, first, last) => {

    const createDataset = (label, color, data) => {
        return {
            label,
            fill: false,
            lineTension: 0.0,
            backgroundColor: color,
            borderColor: color,
            borderCapStyle: 'butt',
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: color,
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: color,
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 10,
            data: data
        };
    };

    let color;
    console.log(last);
    if (last.slice(0, 4) === "2019") {
        color = 'green';
    } else {
        color = 'blue';
    }

    return {
        labels: [...in_labels],
        datasets: [
            createDataset(first + "_" + last, color, [...in_data]),
            // createDataset(first[0].toUpperCase().concat(first.substring(1)), color, [...in_data]),
        ]
    };
};

export default reformatData;
