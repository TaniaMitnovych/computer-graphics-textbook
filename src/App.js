import MainMenu from "./components/MainMenu/MainMenu";
import NavBar from "./components/NavBar/NavBar";
import React, {useEffect, useState} from 'react';
import Fractals from "./components/Fractals/Fractals";
function App() {
  const [section,setSection]=useState(false);
  const sections={
    "fractal-section": <Fractals/>
  }
  function showSection(sectionID){
    // let section=document.querySelector('#'+sectionID);
    // section.style.display='flex';
    setSection(sections[sectionID]);
    console.log(sectionID);
    console.log('shows')
  }
  useEffect(()=>{
    let app=document.querySelector('.App');
    app.addEventListener('setSection', (event)=>{
      
      console.log(event.target.dataset['value']);
      showSection(event.target.dataset['value']);
    })
  },[]);
  return (
    <div className="App">
      <MainMenu/>
      <NavBar/>
      {(()=>{return section})()}
    </div>
  );
}

export default App;
