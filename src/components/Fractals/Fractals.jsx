import React, { useState } from 'react';
import { useEffect } from 'react';
import './Fractals.css';
const Fractals = () => {
  const [iteration, setIteration] = useState(0);
  const [fractal, setFractal] = useState(null);
  const [ctx, setContext] = useState(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    setCanvas(document.getElementById('fractal'));
    setContext(document.getElementById('fractal').getContext('2d'));
  }, [])
  function dragonFractal(x1, y1, x2, y2, iter) {
    if (iter == 0) {
      setTimeout(() => {
        randomColor();
        ctx.fillRect(x1, y1, 1, 1);
        ctx.fillRect(x2, y2, 1, 1);
      }, 0);
      return;
    }

    var dx = (x2 - x1) / 2;
    var dy = (y2 - y1) / 2;
    var x_tmp = x1 + dx - dy;
    var y_tmp = y1 + dy + dx;

    dragonFractal(x1, y1, x_tmp, y_tmp, iter - 1);
    dragonFractal(x2, y2, x_tmp, y_tmp, iter - 1);

  }
  function randomColor() {
    var r, g, b;
    r = randomNumber(100);
    g = randomNumber(100);
    b = randomNumber(100);
    ctx.fillStyle = "#" + r + g + b;
  }
  function randomNumber(max) {
    return Math.floor(Math.random() * (max + 1));
  }
  function saveImage() {
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    downloadImage(image, "canvas.png")
  }
  function downloadImage(data, filename = 'untitled.png') {
    var a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
  }
  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  function drawFractal() {
    clear();
    switch (fractal) {
      case "dragon": dragonFractal(150, 200, 450, 200, iteration); break;
      case "koch-curve": kochCurveFractal([50, 250], [500, 250], iteration); break;
      case "koch-anticurve": kochAntiCurveFractal([50, 150], [500, 150], iteration);
    }
  }

  function kochCurveFractal(beginPoint, endPoint, iter) {

    if (iter < 0) {
      return null;
    }
    var secondPoint = divide(add(multiply(beginPoint, 2), endPoint), 3);
    var thirdPoint = divide(add(multiply(endPoint, 2), beginPoint), 3);
    var middlePoint = divide(add(beginPoint, endPoint), 2);

    var NormalizeVect = divide(minus(middlePoint, beginPoint), length(middlePoint, beginPoint));
    var DirectionVect = [NormalizeVect[1], -NormalizeVect[0]];

    var vertexPoint = add(multiply(DirectionVect, Math.sqrt(3) / 6 * length(endPoint, beginPoint)), middlePoint);

    DrawLine(beginPoint, endPoint, "black");

    if (iter != 0) {
      for (var i = 0; i < 10; i++)
        DrawLine(secondPoint, thirdPoint, "white");
    };
    kochCurveFractal(beginPoint, secondPoint, iter - 1);
    kochCurveFractal(secondPoint, vertexPoint, iter - 1);
    kochCurveFractal(vertexPoint, thirdPoint, iter - 1);
    kochCurveFractal(thirdPoint, endPoint, iter - 1);

  };

  function kochAntiCurveFractal(beginPoint, endPoint, iter) {

    if (iter < 0) {
      return null;
    }
    var secondPoint = divide(add(multiply(beginPoint, 2), endPoint), 3);
    var thirdPoint = divide(add(multiply(endPoint, 2), beginPoint), 3);
    var middlePoint = divide(add(beginPoint, endPoint), 2);

    var NormalizeVect = divide(minus(middlePoint, beginPoint), length(middlePoint, beginPoint));
    var DirectionVect = [-NormalizeVect[1], NormalizeVect[0]];

    var vertexPoint = add(multiply(DirectionVect, Math.sqrt(3) / 6 * length(endPoint, beginPoint)), middlePoint);

    DrawLine(beginPoint, endPoint, "black");

    if (iter != 0) {
      for (var i = 0; i < 10; i++)
        DrawLine(secondPoint, thirdPoint, "white");
    };
    kochAntiCurveFractal(beginPoint, secondPoint, iter - 1);
    kochAntiCurveFractal(secondPoint, vertexPoint, iter - 1);
    kochAntiCurveFractal(vertexPoint, thirdPoint, iter - 1);
    kochAntiCurveFractal(thirdPoint, endPoint, iter - 1);

  };
  function multiply(v, num) {
    return [v[0] * num, v[1] * num];
  };

  function divide(v, num) {
    return [v[0] / num, v[1] / num];
  };

  function add(a, b) {
    return [a[0] + b[0], a[1] + b[1]];
  };

  function minus(a, b) {
    return [a[0] - b[0], a[1] - b[1]];
  };

  function length(a, b) {
    return Math.sqrt(Math.pow(a[0] - b[0], 2) +
      Math.pow(a[1] - b[1], 2));
  };

  function DrawLine(a, b, c) {
    ctx.beginPath();
    ctx.strokeStyle = c;
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(b[0], b[1]);
    ctx.stroke();
    ctx.closePath();
  };

  function highlightButton(event){
    let buttons=document.querySelectorAll(".fractals__button");
    for(let i=0;i<buttons.length;i++){
      buttons[i].style.backgroundColor="#FB8500";
    }
    event.currentTarget.style.backgroundColor="#AD5C00";
  }
  return (
    <section className='fractals'>
      <div className='fractals__manager'>
        <button className='fractals__button button' onClick={(e)=>{setFractal("dragon");highlightButton(e)}}>Dragon</button>
        <button className='fractals__button button' onClick={(e)=>{setFractal("koch-curve");highlightButton(e)}}>Koch curve</button>
        <button className='fractals__button button' onClick={(e)=>{setFractal("koch-anticurve");highlightButton(e)}}>Koch anticurve</button>
        <h2>Iteration {iteration}</h2>
        <input type='range' name='iteration' id='iteration' min='0' max='20' value={iteration} step='1' onChange={(e) => setIteration(e.target.value)} />
        <button className='fractals__button button' onClick={drawFractal}>Generate</button>
        <button className='fractals__button button' onClick={clear}>Clear</button>
        <button className='fractals__button button' onClick={saveImage}>Download</button>
        {/* <button className='fractals__button button'>About fractals</button> */}
      </div>
      <div className='fractals__fractal-image'>
        <canvas id='fractal' width='600px' height='600px'></canvas>
      </div>
    </section>
  );
};

export default Fractals;