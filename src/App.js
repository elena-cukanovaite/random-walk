import './App.css';
import React, {useState, useEffect} from 'react';
import Plot from 'react-plotly.js';

let positionX=0;
let positionY=0;
let positionZ=0;

const ThreeDPlot = (props) => {
  console.log(props.value[0]);
  const [settings, updateSettings] = useState({
      data: [
              {
                  type: 'scatter3d', 
                  x: props.value[0], 
                  y: props.value[1], 
                  z: props.value[2]
              },
          ],
      layout: { width: '100%', height: 600, title: 'Random walk' },
      frames: {},
      config: {},
  });
  useEffect(() => {
      updateSettings((settings) => ({
          ...settings,
          data: [{ ...settings.data[0], x: props.value[0], y: props.value[1], z: props.value[2]}],
      }));
  }, [props.value]);
  return (
      <div>
          <Plot data={settings.data} layout={settings.layout} />
      </div>
  );
};

const App = () => {
  const [count, setCount] = useState([[0],[0],[0]]);
  return (
      <>
          <ThreeDPlot value={count} />
          <button
              onClick={() =>
                  setCount([[...count[0], count[0].at(count[0].length - 1) + Math.random()*2-1],
                  [...count[1], count[1].at(count[1].length - 1) + Math.random()*2-1],
                  [...count[2], count[2].at(count[2].length - 1) + Math.random()*2-1,]])//count.at(count.length - 1) + 1]) //spread operator
              }
          >
              Generate new position
          </button>
      </>
  );
};

export default App;
