import React, {useRef, useState, useEffect} from 'react';
import ResizeObserver from 'react-resize-observer';
import WaterfallChart from './WaterfallChart';

type WaterfallContainerProps = {
  tracingInfo: any;
};

const Waterfall: React.FC<WaterfallContainerProps> = ({tracingInfo}) => {
  const [dimensions, setDimensions] = useState({width: 400, height: 500});

  const handleWaterfallContainerResize = (w, h) => {
    setDimensions({width: w, height: h});
  };

  return (
    <div className="Waterfall-Container" style={{position: 'relative'}}>
      <ResizeObserver
        onResize={rect => {
          console.log('resize event', rect.width, rect.height);
          handleWaterfallContainerResize(rect.width, rect.height);
        }}
      />
      {dimensions.width > 0 && dimensions.height > 0 ? (
        <WaterfallChart
          widthProps={dimensions.width}
          heightProps={500}
          data={tracingInfo}
        />
      ) : null}
    </div>
  );
};

export default Waterfall;
