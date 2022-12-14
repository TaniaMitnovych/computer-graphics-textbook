import React, {useState, useEffect} from 'react';
import './RGBModel.css';
const RGBModel = (props) => {
  const [red, setRed]=useState(0);
  const [green,setGreen]=useState(0);
  const [blue, setBlue]=useState(0);
  useEffect(()=>{
    let rgbColor = document.querySelector(".rgb-model__choosen-color");
    rgbColor.addEventListener("colorChanged",(e)=>{
      setRed(e.target.choosenColor[0]);
      setGreen(e.target.choosenColor[1]);
      setBlue(e.target.choosenColor[2]);
    })
  },[])
  return (
    <div className='rgb-model color-model'>
      <h2>RGB</h2>
      <div className='rgb-model__values color-values'>
        <p>Red</p>
        <input type="range" min="0" max="255" value={red} id="red" onChange={(e)=>{setRed(e.currentTarget.value)}}/>
        <p className='rgb-model__value color-value'>{red}</p>
        <p>Green</p>
        <input type="range" min="0" max="255" value={green} id="green" onChange={(e)=>{setGreen(e.currentTarget.value)}}/>
        <p className='rgb-model__value color-value'>{green}</p>
        <p>Blue</p>
        <input type="range" min="0" max="255" value={blue} id="blue" onChange={(e)=>{setBlue(e.currentTarget.value)}}/>
        <p className='rgb-model__value color-value'>{blue}</p>
      </div>
      <div className='rgb-model__choosen-color choosen-color' style={{background: `rgb(${red},${green},${blue})`}}>
        Color
      </div>

    </div>
  );
};

export default RGBModel;