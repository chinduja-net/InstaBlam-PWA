import React from 'react';
import './App.css';
import Camera from './components/media/Camera';
import Location from './components/Location'; 
import Gallery from './components/Gallery';
import Notis from './components/Notis';



function App() {
  return (
    <div className="App bg-pink-200">
     
    <Camera/>
    < Notis />
    <Gallery />
   <Location /> 
   
    </div>
  );
}

export default App;
