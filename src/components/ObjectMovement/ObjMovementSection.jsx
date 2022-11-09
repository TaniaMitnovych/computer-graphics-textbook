import React, { useState, useEffect } from 'react';
import './ObjMovementSection.css';
const ObjMovementSection = (props) => {
  const [A, setA] = useState([0, 0]);
  const [B, setB] = useState([0, 0]);
  const [C, setC] = useState([0, 0]);
  const [coef, setCoef] = useState(1);
  const [grid_size, setGridSize] = useState(20);
  let canvas;
  useEffect(() => {
    canvas = document.querySelector('#canvas');
    canvas.width = document.querySelector('.object-movement-image').offsetWidth;
    canvas.height = document.querySelector('.object-movement-image').offsetHeight;
    setCanvasGrid();
    window.addEventListener("resize", (event) => {
      canvas.width = document.querySelector('.object-movement-image').offsetWidth;
      canvas.height = document.querySelector('.object-movement-image').offsetHeight;
      setCanvasGrid();
    })
  }, [])
  function moveTriangle() {
    let partsNumber = 200;
    canvas = document.querySelector('#canvas');
    // canvas.width = document.querySelector('.object-movement-image').offsetWidth;
    // canvas.height = document.querySelector('.object-movement-image').offsetHeight;
    // setCanvasGrid();
    let ctx = canvas.getContext("2d");
    let newA = [-A[0] * coef, -A[1] * coef];
    let newB = [-B[0] * coef, -B[1] * coef];
    let newC = [-C[0] * coef, -C[1] * coef];

    console.log([A, B, C]);
    console.log([newA, newB, newC]);
    let partA1 = getDistance([newA[0], 0], [A[0], 0]) / partsNumber;
    let partB1 = getDistance([newB[0], 0], [B[0], 0]) / partsNumber;
    let partC1 = getDistance([newC[0], 0], [C[0], 0]) / partsNumber;
    let partA2 = getDistance([newA[1], 0], [A[1], 0]) / partsNumber;
    let partB2 = getDistance([newB[1], 0], [B[1], 0]) / partsNumber;
    let partC2 = getDistance([newC[1], 0], [C[1], 0]) / partsNumber;

    for (let i = 0; i <= partsNumber; i++) {
      ((i) => setTimeout(() => {
        drawTriangle([moveCoordinate(A[0], partA1, i), moveCoordinate(A[1], partA2, i)],
          [moveCoordinate(B[0], partB1, i), moveCoordinate(B[1], partB2, i)],
          [moveCoordinate(C[0], partC1, i), moveCoordinate(C[1], partC2, i)])
      }, 200))(i)
    }
    setA(newA);
    setB(newB);
    setC(newC);
  }
  function moveCoordinate(coordinate, part, i) {
    let coord;
    if (coordinate > 0) {
      coord = (coordinate - part * i)
    } else if (coordinate < 0) {
      coord = (coordinate + part * i)
    } else {
      coord = (0);
    }
    return coord;
  }
  function getDistance(point1, point2) {
    return Math.sqrt(Math.pow(point2[0] - point1[0], 2) + Math.pow(point2[1] - point1[1], 2));
  }
  function drawTriangle(A, B, C) {
    if (isValidTriangle()) {
      canvas = document.querySelector('#canvas');
      canvas.width = document.querySelector('.object-movement-image').offsetWidth;
      canvas.height = document.querySelector('.object-movement-image').offsetHeight;
      setCanvasGrid();
      console.log([A, B, C]);
      let ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(A[0] * grid_size, -A[1] * grid_size);
      ctx.lineTo(B[0] * grid_size, -B[1] * grid_size);
      ctx.lineTo(C[0] * grid_size, -C[1] * grid_size);
      ctx.closePath();
      ctx.stroke();
    } else {
      alert("You can't draw a triangle with this vertices!");
    }
    //clearCanvas();
    //setCanvasGrid()

  }
  function clearCanvas() {
    canvas = document.querySelector('#canvas');
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  function setCanvasGrid() {
    //var grid_size = 20;
    var x_axis_distance_grid_lines = 5;
    var y_axis_distance_grid_lines = 5;
    var x_axis_starting_point = { number: 1, suffix: '' };
    var y_axis_starting_point = { number: 1, suffix: '' };
    //var canvas = document.getElementById("my-canvas");
    var ctx = canvas.getContext("2d");
    // canvas width
    var canvas_width = canvas.width;
    // canvas height
    var canvas_height = canvas.height;
    // no of vertical grid lines
    var num_lines_x = Math.floor(canvas_height / grid_size);
    // no of horizontal grid lines
    var num_lines_y = Math.floor(canvas_width / grid_size);
    // Draw grid lines along X-axis
    for (var i = 0; i <= num_lines_x; i++) {
      ctx.beginPath();
      ctx.lineWidth = 1;
      // If line represents X-axis draw in different color
      if (i == Math.floor(num_lines_x / 2))
        ctx.strokeStyle = "#000000";
      else
        ctx.strokeStyle = "#e9e9e9";
      if (i == num_lines_x) {
        ctx.moveTo(0, grid_size * i);
        ctx.lineTo(canvas_width, grid_size * i);
      }
      else {
        ctx.moveTo(0, grid_size * i + 0.5);
        ctx.lineTo(canvas_width, grid_size * i + 0.5);
      }
      ctx.stroke();
    }
    // Draw grid lines along Y-axis
    for (i = 0; i <= num_lines_y; i++) {
      ctx.beginPath();
      ctx.lineWidth = 1;
      // If line represents Y-axis draw in different color
      if (i == Math.floor(num_lines_y / 2))
        ctx.strokeStyle = "#000000";
      else
        ctx.strokeStyle = "#e9e9e9";
      if (i == num_lines_y) {
        ctx.moveTo(grid_size * i, 0);
        ctx.lineTo(grid_size * i, canvas_height);
      }
      else {
        ctx.moveTo(grid_size * i + 0.5, 0);
        ctx.lineTo(grid_size * i + 0.5, canvas_height);
      }
      ctx.stroke();
    }
    ctx.translate(Math.floor(num_lines_y / 2) * grid_size, Math.floor(num_lines_x / 2) * grid_size);
    // Ticks marks along the positive X-axis
    for (i = 1; i < (num_lines_y - y_axis_distance_grid_lines); i++) {
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#000000";
      // Draw a tick mark 6px long (-3 to 3)
      ctx.moveTo(grid_size * i + 0.5, -3);
      ctx.lineTo(grid_size * i + 0.5, 3);
      ctx.stroke();
      // Text value at that point
      ctx.font = '9px Arial';
      ctx.textAlign = 'start';
      ctx.fillText(x_axis_starting_point.number * i + x_axis_starting_point.suffix, grid_size * i - 2, 15);
    }
    // Ticks marks along the negative X-axis
    for (i = 1; i < Math.floor(num_lines_y / 2); i++) {
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#000000";
      // Draw a tick mark 6px long (-3 to 3)
      ctx.moveTo(-grid_size * i + 0.5, -3);
      ctx.lineTo(-grid_size * i + 0.5, 3);
      ctx.stroke();
      // Text value at that point
      ctx.font = '9px Arial';
      ctx.textAlign = 'end';
      ctx.fillText(-x_axis_starting_point.number * i + x_axis_starting_point.suffix, -grid_size * i + 3, 15);
    }
    // Ticks marks along the positive Y-axis
    // Positive Y-axis of graph is negative Y-axis of the canvas
    for (i = 1; i < (num_lines_x - x_axis_distance_grid_lines); i++) {
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#000000";
      // Draw a tick mark 6px long (-3 to 3)
      ctx.moveTo(-3, grid_size * i + 0.5);
      ctx.lineTo(3, grid_size * i + 0.5);
      ctx.stroke();
      // Text value at that point
      ctx.font = '9px Arial';
      ctx.textAlign = 'start';
      ctx.fillText(-y_axis_starting_point.number * i + y_axis_starting_point.suffix, 8, grid_size * i + 3);
    }
    // Ticks marks along the negative Y-axis
    // Negative Y-axis of graph is positive Y-axis of the canvas
    for (i = 1; i < Math.floor(num_lines_x / 2); i++) {
      ctx.beginPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#000000";
      // Draw a tick mark 6px long (-3 to 3)
      ctx.moveTo(-3, -grid_size * i + 0.5);
      ctx.lineTo(3, -grid_size * i + 0.5);
      ctx.stroke();
      // Text value at that point
      ctx.font = '9px Arial';
      ctx.textAlign = 'start';
      ctx.fillText(y_axis_starting_point.number * i + y_axis_starting_point.suffix, 8, -grid_size * i + 3);
    }
  }
  function isValidTriangle() {
    let res = (C[1] - A[1]) / (B[1] - A[1]) - (C[0] - A[0]) / (B[0] - A[0]);
    console.log(res);
    if (Math.abs(res) < 0.000001 || Number.isNaN(res)) {
      return false;
    } else return true;
  }
  useEffect(() => {
    canvas = document.querySelector('#canvas');
    canvas.width = document.querySelector('.object-movement-image').offsetWidth;
    canvas.height = document.querySelector('.object-movement-image').offsetHeight;
    setCanvasGrid()
    //drawTriangle(A,B,C);
  }, [grid_size])
  return (
    <div className='object-movement-section'>
      <div className='object-movement-manager'>
        <p>Vertices</p>
        <label>
          A ( <input type='number' value={A[0]} onChange={(e) => setA([Number(e.target.value), A[1]])} /> ;
          <input type='number' value={A[1]} onChange={(e) => setA([A[0], Number(e.target.value)])} /> )
        </label>
        <label>
          B ( <input type='number' value={B[0]} onChange={(e) => setB([Number(e.target.value), B[1]])} /> ;
          <input type='number' value={B[1]} onChange={(e) => setB([B[0], Number(e.target.value)])} /> )
        </label>
        <label>
          C ( <input type='number' value={C[0]} onChange={(e) => setC([Number(e.target.value), C[1]])} /> ;
          <input type='number' value={C[1]} onChange={(e) => setC([C[0], Number(e.target.value)])} /> )
        </label>
        <label>
          Coefficient <input type='number' step="0.1" value={coef} onChange={(e) => setCoef(Number(e.target.value))} />
        </label>
        <label>
          Grid size <input type='number' step="5" min="10"value={grid_size} onChange={(e) => setGridSize(Number(e.target.value))} />px
        </label>
        <button type='button' className='obj-movement-button button' onClick={() => drawTriangle(A, B, C)}>Draw</button>
        <button type='button' className='obj-movement-button button' onClick={moveTriangle}>Move</button>
        <button type='button' className='obj-movement-button button'>About object movement</button>
      </div>
      <div className='object-movement-image'>
        <canvas id="canvas"></canvas>
      </div>
    </div>
  );
};

export default ObjMovementSection;