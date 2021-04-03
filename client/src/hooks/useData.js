import { useTheme } from '@material-ui/core/styles';

const useData = () => {
    const theme = useTheme();

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

    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;
    const success = theme.palette.success.main;
    const grey = theme.palette.grey[400];

    return {
        labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ],
        datasets: [
        createDataset('Coast Guard', primary, [
            65,
            59,
            80,
            81,
            56,
            55,
            40,
            62,
            70,
            75,
            70,
            60
        ]),
        createDataset('Marines', secondary, [
            32,
            30,
            40,
            41,
            28,
            27,
            20,
            31,
            35,
            37,
            30,
            20
        ]),
        createDataset('Army', grey, [
            16,
            15,
            20,
            21,
            14,
            13,
            10,
            16,
            18,
            19,
            10,
            0
        ]),
        createDataset('Air Force', success, [
            48,
            45,
            60,
            62,
            42,
            40,
            30,
            47,
            53,
            56,
            50,
            40
        ])
        ]
    };
};

export default useData;
