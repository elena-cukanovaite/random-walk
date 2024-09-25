import './App.css';
import React, {useState, useEffect} from 'react';
import Plot from 'react-plotly.js';

let positionX=0;
let positionY=0;
let positionZ=0;


const ThreeDPlotManyParticles = (props) => {
    console.log('ahhd', props.value[0].x);
    const [settings, updateSettings] = useState({
        data: props.value,
        layout: { width: '100%', height: 300, title: 'Random walk', showlegend: false},
        frames: {},
        config: {},
    });
    useEffect(() => {
        updateSettings((settings) => ({
            ...settings,
            data: props.value,
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

const initiatedPosition = {x: [positionX], y: [positionY], z: [positionZ], 
    type: 'scatter3d', 
    marker: {color:'rgb(127, 127, 127)'}};

const App = () => {
  const [valueOfSlider, setValueOfSlider] = useState("1");
  const [particles, setParticles] = useState([initiatedPosition]); 

  const addNewParticle = () => {
    let NewParticle = {x: [Math.random()*2-1], y: [Math.random()*2-1], z: [Math.random()*2-1], 
        type: 'scatter3d', 
        marker: {color: `rgb(${Math.random()*256}, ${Math.random()*256}, ${Math.random()*256})`}}
    setParticles([...particles,NewParticle]);
  };
  
  const addOneNewStep = () => {
    const newParticles = particles.map((particle) => ({
        ...particle,
        x: [...particle.x, randomStepCalculation(particle.x)],
        y: [...particle.y, randomStepCalculation(particle.y)],
        z: [...particle.z, randomStepCalculation(particle.z)],
    }));

    setParticles(newParticles);
};

  const manyRandomSteps = (e) => {
    const numberOfSteps = e.target.value;
    
    const newParticles = particles.map((particle) => {
        let newX = [particle.x[0]];
        let newY = [particle.y[0]];
        let newZ = [particle.z[0]];

        for (let i = 0; i < numberOfSteps; i++) {
            newX.push(randomStepCalculation(newX));
            newY.push(randomStepCalculation(newY));
            newZ.push(randomStepCalculation(newZ));
        }

        return {
            ...particle,
            x: newX,
            y: newY,
            z: newZ,
        };
    });

    setParticles(newParticles);
    setValueOfSlider(numberOfSteps);
};


  return (
      <>
        <button
              onClick={addOneNewStep}
            >
                Generate one new position
        </button>
        <button onClick={addNewParticle}>Add one new particle</button>
        <p>Generate many positions at once</p>
        <b>Number of steps: </b>
        <input type="range" class="slider" min="1" max="5" value={valueOfSlider} id='slider' onChange={manyRandomSteps}></input>
        {valueOfSlider}

        <ThreeDPlotManyParticles 
            value={particles} 
        />
          
      </>
  );
};

export default App;
