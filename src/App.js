import './App.css';
import React, {useState, useEffect} from 'react';
import Plot from 'react-plotly.js';

let positionX=0;
let positionY=0;
let positionZ=0;

const ThreeDPlot = (props) => {
  //console.log(props.value[0]);
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

  const randomStep = (array) => {
    return [...array, array.at(array.length - 1) + Math.random()*2-1]
  }

  const manyRandomSteps = (e) => {
    let countMany = [[positionX],[positionY],[positionZ]]

    let numberOfSteps = e.target.value;
    for (let i=0; i < numberOfSteps; i++){
        countMany[0].push(countMany[0].at(countMany[0].length - 1) + Math.random()*2-1);
        countMany[1].push(countMany[1].at(countMany[1].length - 1) + Math.random()*2-1);
        countMany[2].push(countMany[2].at(countMany[2].length - 1) + Math.random()*2-1);
    };
    setCount(countMany)
  }
  
  //const [sliderValue, setSliderValue] = useState("50");
  return (
      <>
          <ThreeDPlot value={count} />
          <button
              onClick={() =>
                  setCount([randomStep(count[0]),
                  randomStep(count[1]),
                  randomStep(count[2])])
              }
          >
              Generate one new position
          </button>
          <p>Generate many positions at once</p>
          <b>Number of steps: </b>
          <input type="range" class="slider" min="0" max="1000" id='slider' onChange={manyRandomSteps}></input>
          {/* <button onClick={manyRandomSteps(count)}>Generate many steps at once</button> */}
      </>
  );
};

export default App;
