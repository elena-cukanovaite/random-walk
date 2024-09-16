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

const ThreeDPlotManyParticles = (props) => {
    const [settings, updateSettings] = useState({
        data: props.value,
        layout: { width: '100%', height: 300, title: 'Random walk', },
        frames: {},
        config: {},
    });
    useEffect(() => {
        console.log('props: ',props.value);
        updateSettings((settings) => ({
            ...settings,
            data: props.value,
        }));
        console.log('jhd: ',props.value)
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

const initiatedPosition = {x: [positionX], y: [positionY], z: [positionZ], 
    type: 'scatter3d', 
    marker: {color:'rgb(127, 127, 127)'}};

const initiatedPosition2 = {x: [1], y: [1], z: [1], 
        type: 'scatter3d', 
        marker: {color:'rgb(0, 0, 0)'}};

const App = () => {
  const [data, setData] = useState([[positionX],[positionY],[positionZ]]);
  const [valueOfSlider, setValueOfSlider] = useState("1");
  const [particles, setParticles] = useState([initiatedPosition,initiatedPosition2]); 

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
  };

  const addNewParticle = () => {
    let NewParticle = {x: [Math.random()*2-1], y: [Math.random()*2-1], z: [Math.random()*2-1], 
        type: 'scatter3d', 
        marker: {color: `rgb(${Math.random()*256}, ${Math.random()*256}, ${Math.random()*256})`}}
            // `rgb(${Math.random()*256}, ${Math.random()*256}, ${Math.random()*256})`}}
    // particles.push(NewParticle);
    setParticles([...particles,NewParticle]);
    // console.log(particles);
  };
  
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
        <button onClick={addNewParticle}>Add one new particle</button>
        <p>Generate many positions at once</p>
        <b>Number of steps: </b>
        <input type="range" class="slider" min="1" max="1000" value={valueOfSlider} id='slider' onChange={manyRandomSteps}></input>
        {valueOfSlider}

        {/* <ThreeDPlot 
            value={data} 
        /> */}
        <ThreeDPlotManyParticles 
            value={particles} 
        />
          
      </>
  );
};

export default App;
