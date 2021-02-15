import React from 'react';
import { Line, Bar, Pie, defaults } from 'react-chartjs-2';
import { useTheme } from '@material-ui/core/styles';

const Chart = ({ data, type }) => {
  const theme = useTheme();

  defaults.global.defaultFontColor = theme.palette.text.primary;
  defaults.global.defaultFontFamily = 'Roboto';
  const lineColor = theme.palette.divider;

  const chooseGraph = () => {
    switch (type?.toLowerCase()) {
      case 'line':
        return Line;
      case 'bar':
        return Bar;
      case 'pie':
        return Pie;
      default:
        return Line;
    }
  };

  const Graph = chooseGraph();
  const displayGrid = Graph === Pie;
  
  return (
    <div style={{ display: 'block', height: 250, margin: theme.spacing(1) }}>
      <Graph
        data={data}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            labels: {
              boxWidth: 20
            }
          },
          scales: {
            yAxes: [{ gridLines: {display: displayGrid,
                                  color: lineColor } }],
            xAxes: [{ gridLines: {display: displayGrid,
                                   color: lineColor } }]
          }
        }}
      />
    </div>
  );


};

export default Chart;
