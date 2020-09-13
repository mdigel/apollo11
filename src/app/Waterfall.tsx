import React, {useRef, useState, useEffect} from 'react';
import {drawChart, initChart} from '../chart/waterfallChart';
import WaterfallChart from './WaterfallChart';

// Blog for using D3 and React: https://www.pluralsight.com/guides/drawing-charts-in-react-with-d3

// interface VisualizerProps {
//   filteredCurSnap: filteredSnapshot;
// }

const dataset = [
  [10, 30, 40, 20],
  [10, 40, 30, 20, 50, 10],
  [60, 30, 40, 20, 30],
];
let i = 0;

const Waterfall: React.FC = () => {
  const [data, setData] = useState([]);

  const changeData = () => {
    setData(dataset[i++]);
    if (i === dataset.length) i = 0;
  };

  useEffect(() => {
    changeData();
  }, []);

  return (
    <div className="App">
      <h2>Graphs with React</h2>
      <button onClick={changeData} type="button">
        Change Data
      </button>
      <WaterfallChart width={600} height={400} data={data} />
    </div>
  );
};

export default Waterfall;
