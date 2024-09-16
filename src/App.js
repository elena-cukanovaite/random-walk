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



const App = () => {

  const [count, setCount] = useState([[positionX],[positionY],[positionZ]]);
  const [valueOfSlider, setValueOfSlider] = useState("1");

  const randomStepCalculation = (array) => {
    return array.at(array.length - 1) + Math.random()*2-1
  }

  const oneRandomStep = (array) => {
    return [...array, randomStepCalculation(array)]
  }

  const manyRandomSteps = (e) => {
    let countMany = [[positionX],[positionY],[positionZ]]

    let numberOfSteps = e.target.value;
    for (let i=0; i < numberOfSteps; i++){
        countMany[0].push(randomStepCalculation(countMany[0]));
        countMany[1].push(randomStepCalculation(countMany[1]));
        countMany[2].push(randomStepCalculation(countMany[2]));
    };
    setCount(countMany);
    setValueOfSlider(numberOfSteps);
  }
  
  return (
      <>
          <ThreeDPlot value={count} />
          <button
              onClick={() =>
                  setCount([oneRandomStep(count[0]),
                  oneRandomStep(count[1]),
                  oneRandomStep(count[2])])
              }
          >
              Generate one new position
          </button>
          <button onClick={() =>
                  setCount([oneRandomStep(count[0]),
                  oneRandomStep(count[1]),
                  oneRandomStep(count[2])])
              }>
            Add one new particle</button>
          <p>Generate many positions at once</p>
          <b>Number of steps: </b>
          <input type="range" class="slider" min="1" max="1000" value={valueOfSlider} id='slider' onChange={manyRandomSteps}></input>
          {valueOfSlider}

          {/* <button onClick={manyRandomSteps(count)}>Generate many steps at once</button> */}
      </>
  );
};

export default App;
