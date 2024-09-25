import './App.css';
import React, {useState, useEffect} from 'react';
import Plot from 'react-plotly.js';

let positionX=0;
let positionY=0;
let positionZ=0;

const CustomPlot = ({props,layoutTitle,xAxisTitle,yAxisTitle,zAxisTitle}) => {
    const [settings, updateSettings] = useState({
        data: props,
        layout: { width: '100%', height: '100%', title: layoutTitle, showlegend: false, 
                scene:{xaxis:{title:xAxisTitle},
                        yaxis:{title:yAxisTitle}, 
                        zaxis:{title:zAxisTitle}},
                xaxis:{title:xAxisTitle},
                yaxis:{title:yAxisTitle},
                zaxis:{title:zAxisTitle},
                },
        frames: {},
        config: {},
    });
    useEffect(() => {
        updateSettings((settings) => ({
            ...settings,
            data: props,
        }));
    }, [props]);
    return (
        <div>
            <Plot data={settings.data} layout={settings.layout} />
        </div>
    );
  };

const randomStepCalculation = (array) => {
    return array.at(array.length - 1) + Math.random()*2-1
  }

const initiatedPosition3D = {x: [positionX], y: [positionY], z: [positionZ], 
    type: 'scatter3d', 
    marker: {color:'rgb(127, 127, 127)'}};

const initiatedPositionXY = {x: [positionX], y: [positionY], 
    type: 'scatter', 
    marker: {color:'rgb(127, 127, 127)'}};   

const initiatedPositionXZ = {x: [positionX], y: [positionZ], 
    type: 'scatter', 
    marker: {color:'rgb(127, 127, 127)'}}; 

const initiatedPositionYZ = {x: [positionY], y: [positionZ], 
    type: 'scatter', 
    marker: {color:'rgb(127, 127, 127)'}}; 



const App = () => {
  const [valueOfSlider, setValueOfSlider] = useState("1");
  const [particles, setParticles] = useState([initiatedPosition3D]);
  const [particleXY, setParticlesXY] = useState([initiatedPositionXY]); 
  const [particleXZ, setParticlesXZ] = useState([initiatedPositionXZ]); 
  const [particleYZ, setParticlesYZ] = useState([initiatedPositionYZ]); 
  const [average, setAverage] = useState({x:0,y:0,z:0});

  const average3D = () => {
    let sumX = 0;
    let lengthX = 0;
    let sumY = 0;
    let lengthY = 0;
    let sumZ = 0;
    let lengthZ = 0;
    for (let i = 0; i < particles.length; i++) {
        let arrayX = particles[i].x;
        sumX += arrayX.reduce((a, b) => a + b, 0);
       
        lengthX += arrayX.length;

        let arrayY = particles[i].y;
        sumY += arrayY.reduce((a, b) => a + b, 0);
        lengthY += arrayY.length;

        let arrayZ = particles[i].z;
        sumZ += arrayZ.reduce((a, b) => a + b, 0);
        lengthZ += arrayZ.length;
    }

    return {x: sumX/lengthX, y: sumY/lengthY, z: sumZ/lengthZ}
    };

  const addNewParticle = () => {
    let newParticle3D = {x: [Math.random()*2-1], y: [Math.random()*2-1], z: [Math.random()*2-1], 
        type: 'scatter3d', 
        marker: {color: `rgb(${Math.random()*256}, ${Math.random()*256}, ${Math.random()*256})`}}    
    setParticles([...particles,newParticle3D]);

    let newParticleXY = {...newParticle3D};
    newParticleXY.type = 'scatter';
    setParticlesXY([...particleXY,newParticleXY]);

    let newParticleXZ = {...newParticleXY};
    newParticleXZ.y = newParticleXY.z;
    setParticlesXZ([...particleXZ,newParticleXZ]);

    let newParticleYZ = {...newParticleXY};
    newParticleYZ.x = newParticleXY.y;
    newParticleYZ.y = newParticleXY.z;
    setParticlesYZ([...particleYZ,newParticleYZ]);

  };
  
  const addOneNewStep = () => {
    const newParticles = particles.map((particle) => ({
        ...particle,
        x: [...particle.x, randomStepCalculation(particle.x)],
        y: [...particle.y, randomStepCalculation(particle.y)],
        z: [...particle.z, randomStepCalculation(particle.z)],
    }));

    const newParticlesXY = newParticles.map((particle) => ({
        ...particle,
        type: 'scatter'
    }));

    const newParticlesXZ = newParticlesXY.map((particle) => ({
        ...particle,
        y: particle.z
    }));

    const newParticlesYZ = newParticlesXY.map((particle) => ({
        ...particle,
        x: particle.y,
        y: particle.z
    }));

    setParticles(newParticles);
    setParticlesXY(newParticlesXY);
    setParticlesXZ(newParticlesXZ);
    setParticlesYZ(newParticlesYZ);
};

  const manyRandomSteps = (e) => {
    const numberOfSteps = e.target.value-1;
    
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

    const newParticlesXY = newParticles.map((particle) => {
        return {
            ...particle,
            type: 'scatter'
        }
    });

    const newParticlesXZ = newParticlesXY.map((particle) => {
        return {
            ...particle,
            y: particle.z
        }
    });

    const newParticlesYZ = newParticlesXY.map((particle) => {
        return {
            ...particle,
            x: particle.y,
            y: particle.z
        }
    });

    setParticles(newParticles);
    setParticlesXY(newParticlesXY);
    setParticlesXZ(newParticlesXZ);
    setParticlesYZ(newParticlesYZ);
    setValueOfSlider(numberOfSteps);
};


  return (
      <>
        AVERAGE: {average3D().x}, {average3D().y}, {average3D().z}
        <br></br>
        <button onClick={addNewParticle}>Add one new particle</button>
        <button
              onClick={addOneNewStep}
            >
                Generate one new position
        </button>
        <p>Generate many positions at once</p>
        <b>Number of steps: </b>
        <input type="range" class="slider" min="1" max="1001" value={valueOfSlider} id='slider' onChange={manyRandomSteps}></input>
        {valueOfSlider}
        <CustomPlot 
            props={particles}
            layoutTitle="3D Random Walk"
            xAxisTitle="X Axis"
            yAxisTitle="Y Axis"
            zAxisTitle="Z Axis"
        />
        <CustomPlot 
            props={particleXY} 
            layoutTitle="X-Y Projection of 3D Random Walk"
            xAxisTitle="X Axis"
            yAxisTitle="Y Axis"
        />
        <CustomPlot 
            props={particleXZ} 
            layoutTitle="X-Z Projection of 3D Random Walk"
            xAxisTitle="X Axis"
            yAxisTitle="Z Axis"
        />
        <CustomPlot 
            props={particleYZ} 
            layoutTitle="Y-Z Projection of 3D Random Walk"
            xAxisTitle="Y Axis"
            yAxisTitle="Z Axis"
        />
        
      </>
  );
};

export default App;
