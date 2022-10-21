import React, { useState, useEffect } from 'react';
import HSLModel from '../HSLModel/HSLModel';
import RGBModel from '../RGBModel/RGBModel';
import './ColorModels.css';
import imageIcon from '../../images/image_icon.svg';
const ColorModels = () => {
  const [lightness, setLightness] = useState(0);
  const [backgroundImg, setBackgroundImg] = useState(imageIcon);
  const [choosenImg, setChoosenImg]=useState(null);
  let canvas, image;
  useEffect(() => {
    canvas = document.querySelector("#color-model__img");
  })
  function insertImageIntoCanvas(e) {
    let imagePicker = document.querySelector(".color-models__image-picker");
    imagePicker.style.display = "none";
    image = document.createElement('img');
    image.src = URL.createObjectURL(e.target.files[0]);

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      canvas.getContext('2d').drawImage(image, 0, 0);
    }
    canvas.addEventListener('mousemove', function (e) {
      const bounding = canvas.getBoundingClientRect();
      const x = e.clientX - bounding.left;
      const y = e.clientY - bounding.top;
      let pixelData = canvas.getContext('2d')
        .getImageData(x, y, 1, 1).data;
      let event = new Event("colorChanged");
      let rgbColor = document.querySelector(".rgb-model__choosen-color");
      let hslColor = document.querySelector(".hsl-model__choosen-color");
      rgbColor.choosenColor = [pixelData[0], pixelData[1], pixelData[2]];
      hslColor.choosenColor = rgbToHsl(rgbColor.choosenColor);
      rgbColor.dispatchEvent(event);
      hslColor.dispatchEvent(event);
    }, false);
  }

  function rgbToHsl(rgb = [0, 0, 0]) {
    let r=rgb[0] / 255;
    let g=rgb[1] / 255;
    let b=rgb[2] / 255;
    const l = Math.max(r, g, b);
    const s = l - Math.min(r, g, b);
    const h = s
      ? l === r
        ? (g - b) / s
        : l === g
          ? 2 + (b - r) / s
          : 4 + (r - g) / s
      : 0;
    return [
      Math.floor(60 * h < 0 ? 60 * h + 360 : 60 * h),
      Math.floor(100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0)),
      Math.floor((100 * (2 * l - s)) / 2),
    ];
  }

  function hslToRgb(hsl = [0, 0, 0]) {
    let h = hsl[0];
    let s = hsl[1] / 100;
    let l = hsl[2] / 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [255 * f(0), 255 * f(8), 255 * f(4)];
  }


  function changeLightnessOfRed() {
    let data = canvas.getContext('2d')
      .getImageData(0, 0, canvas.width, canvas.height);
    let imgData = data.data;
    for (let i = 0; i < imgData.length; i += 4) {
      let hsl = rgbToHsl([imgData[i], imgData[i + 1], imgData[i + 2]]);
      if (hsl[0] >= 355 || hsl[0] <= 10) {
        hsl[2] = lightness;
        let rgb = hslToRgb(hsl);
        imgData[i] = rgb[0];
        imgData[i + 1] = rgb[1];
        imgData[i + 2] = rgb[2];
      }
    }
    canvas.getContext('2d').putImageData(data, 0, 0);
  }
  useEffect(()=>{
    changeLightnessOfRed();
  },[lightness])
  return (
    <div className='color-models'>
      <div className='color-models__manager'>

        <RGBModel />
        <HSLModel />
        <div className='color-models__lightness-range'>
          <p>Lightness of red</p>
          <input type='range' min="0" max="100" value={lightness}
            onChange={(e) => { setLightness(e.target.value);  }} />
          <p className='lightness-value'>{lightness}</p>
        </div>

      </div>
      <div className='color-models__image'>
        <div className='color-models__image-picker'>
          <label htmlFor='image'><img src={backgroundImg} alt="" />Choose an image...</label>
          <input type="file" accept=".png, .jpg, .jpeg" id="image"
            onChange={(e) => { insertImageIntoCanvas(e) }} />
        </div>
        <canvas className='color-model__img' id="color-model__img"></canvas>
      </div>
    </div>
  );
};

export default ColorModels;