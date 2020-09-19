// BarChart.js
//Blog Used For D3 Chart: https://blockbuilder.org/jdmarlin/ebcc77f97207d1a4792d3bf250ab39d1
import * as d3 from 'd3';
import React, {useRef, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import drawChart from './chart-util/drawChart';
import dataPrepForChart from './chart-util/dataPrepForChart';
import tracingToChart from './chart-util/tracingToChartData';

// test data from the blog
const test = [
  // {
  //   package: 'AAPL',
  //   nominal: '-100.0',
  //   financing_type: 'pay',
  // },
  {
    package: 'AAPL',
    nominal: '-160',
    financing_type: 'pay',
  },
  {
    package: 'AAPL',
    nominal: '150.0',
    financing_type: 'receive',
  },
  // {
  //   package: 'AAPL',
  //   nominal: '160.0',
  //   financing_type: 'receive',
  // },
  {
    package: 'AMZN',
    nominal: '100',
    financing_type: 'receive',
  },
  {
    package: 'AMZN',
    nominal: '-150',
    financing_type: 'pay',
  },
];

function BarChart({widthProps, heightProps, data}) {
  const ref = useRef<SVGSVGElement>();

  // Update chart when deminsons or data change
  useEffect(() => {
    // Transform data in our app to data the blog's chart expects
    const newData = tracingToChart(data);

    // Use the blog's data transform logic to prepare for chart creation
    const processedData = dataPrepForChart(newData);

    // Build the D3 chart with the blog's code
    drawChart(ref.current, processedData, widthProps, heightProps);
  }, [widthProps]);

  return (
    <div className="chart" id="chart">
      <svg id="canvas" ref={ref}></svg>
    </div>
  );
}

/* Note For Later: probably 
need to send the data.duration 
too for the x-axis length to draw chart??  */
export default BarChart;
