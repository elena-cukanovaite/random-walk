import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
//import useReact from 'react';
import Plot from 'react-plotly.js';

let positionX=0;
let positionY=0;
let positionZ=0;

function move() {
  let randomX;
  let randomY;
  let randomZ;

  randomX = Math.random()*2-1;
  randomY = Math.random()*2-1;
  randomZ = Math.random()*2-1;

  positionX += randomX;
  positionY += randomY;
  positionZ += randomZ;

  const plotComponent = document.getElementsByClassName('js-plotly-plot');

  //plotComponent.style.margin=`${positionX}px ${positionY}px`

  console.log(positionX,positionY,positionZ)

};

const ThreeDPlot = () => {
  const [settings, updateSettings] = useState({
    data: [
        {
            type: 'scatter3d', 
            x: [positionX], 
            y: [positionY], 
            z: [positionZ]
        },
    ],
    layout: {width: 500, height: 500, title: 'Random walk'}
  });
  return (
    <div>
        <Plot 
          data={[
            {type: 'scatter3d', x: [positionX], y: [positionY], z: [positionZ]}
          ]}
          layout={ {width: 500, height: 500, title: 'Random walk'} } />
    </div>
  );
}


class App extends React.Component {
  render() {
    return (
      <center>
      {/* <div> */}
      <button id="randomButton" onClick = {move}>Generate new position</button>
      {/* <br></br> */}
      {/* <ThreeDPlot /> */}
      <ThreeDPlot value={[positionX,positionY,positionZ]}/>
      {/* <Plot 
        data={[
          {type: 'scatter3d', x: [positionX], y: [positionY], z: [positionZ]}
        ]}
        layout={ {width: 1000, height: 1000, title: 'Random walk'} }
      /> */}
      {/* </div> */}
      </center>
    );
  }
}



// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
