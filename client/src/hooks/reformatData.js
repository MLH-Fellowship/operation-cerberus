const reformatData = (in_labels, in_data, fname) => {

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
    if (fname === 'army') {
        color = 'green';
    } else {
        color = 'blue';
    }

    return {
        labels: [...in_labels],
        datasets: [
            createDataset(fname[0].toUpperCase().concat(fname.substring(1)), color, [...in_data]),
        ]
    };
};

export default reformatData;
