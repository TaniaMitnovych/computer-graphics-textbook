import React, {useState} from 'react';
const HSLModel = () => {
  const [hue, setHue]=useState(0);
  const [saturation,setSaturation]=useState(0);
  const [lightness, setLightness]=useState(0);
  return (
    <div className='hsl-model color-model'>
      <h2>HSL</h2>
      <div className='hsl-model__values color-values'>
        <p>Hue</p>
        <input type="range" min="0" max="360" value={hue} onChange={(e)=>{setHue(e.currentTarget.value)}}/>
        <p className='hsl-model__value color-value'>{hue}</p>
        <p>Saturation</p>
        <input type="range" min="0" max="100" value={saturation} onChange={(e)=>{setSaturation(e.currentTarget.value)}}/>
        <p className='hsl-model__value color-value'>{saturation}</p>
        <p>Lightness</p>
        <input type="range" min="0" max="100" value={lightness} onChange={(e)=>{setLightness(e.currentTarget.value)}}/>
        <p className='hsl-model__value color-value'>{lightness}</p>
      </div>
      <div className='hsl-model__choosen-color choosen-color' style={{background: `hsl(${hue},${saturation}%,${lightness}%)`}}>
        Color
      </div>

    </div>
  );
};

export default HSLModel;