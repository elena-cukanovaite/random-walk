import './App.css';
import React, {useState, useEffect} from 'react';
import Plot from 'react-plotly.js';

let positionX=0;
let positionY=0;
let positionZ=0;

const ThreeDPlot = (props) => {
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

const randomStepCalculation = (array) => {
    return array.at(array.length - 1) + Math.random()*2-1
  }

const oneRandomStep = (array) => {
    return [...array, randomStepCalculation(array)]
  }

const App = () => {

  const [data, setData] = useState([[positionX],[positionY],[positionZ]]);
  const [valueOfSlider, setValueOfSlider] = useState("1");

  const manyRandomSteps = (e) => {
    let data = [[positionX],[positionY],[positionZ]]

    let numberOfSteps = e.target.value;
    for (let i=0; i < numberOfSteps; i++){
        data[0].push(randomStepCalculation(data[0]));
        data[1].push(randomStepCalculation(data[1]));
        data[2].push(randomStepCalculation(data[2]));
    };
    setData(data);
    setValueOfSlider(numberOfSteps);
  }
  
  return (
      <>
        <button
              onClick={() =>
                  setData([oneRandomStep(data[0]),
                  oneRandomStep(data[1]),
                  oneRandomStep(data[2])])
              }
            >
                Generate one new position
        </button>
        <button onClick={() =>
                  setData([oneRandomStep(data[0]),
                  oneRandomStep(data[1]),
                  oneRandomStep(data[2])])
              }
            >
                Add one new particle
        </button>
        <p>Generate many positions at once</p>
        <b>Number of steps: </b>
        <input type="range" class="slider" min="1" max="1000" value={valueOfSlider} id='slider' onChange={manyRandomSteps}></input>
        {valueOfSlider}

        <ThreeDPlot 
            value={data} 
        />
          
      </>
  );
};

export default App;
