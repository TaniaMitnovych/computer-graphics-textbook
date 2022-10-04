import React, {useEffect} from 'react';
import './NavBar.css';
const NavBar = () => {
  function cancelAllSelections(){
    let sectionList=document.querySelector('.navbar__section-list');
    for(const sectionItem of sectionList.children){
      sectionItem.style.backgroundColor='transparent';
      sectionItem.children[0].style.color="#FB8500";
    }
  }
  function chooseSection(event){
    cancelAllSelections();
    event.currentTarget.style.backgroundColor="#FB8500";
    event.currentTarget.children[0].style.color='#ffffff';
    let e = new Event("setSection", {bubbles: true});
    event.currentTarget.dispatchEvent(e);
  }
  function showMainMenu(){
    let mainMenu=document.querySelector(".main-menu");
    mainMenu.style.display="flex";
  }
  function addEventListeners(){
    let sectionList=document.querySelector('.navbar__section-list');
    for(const sectionItem of sectionList.children){
      sectionItem.addEventListener('click',(e)=>{chooseSection(e)} );
    }
  }
  useEffect(()=>{
    addEventListeners();
  },[]);
  
  return (
    <nav className='navbar' >
      <h1 className='navbar__logo' onClick={showMainMenu}><a>M</a></h1>
      <ul className='navbar__section-list'>
        <li className='navbar__section-item' id='fractal-section' data-value='fractal-section'><a>Fractals</a></li>
        <li className='navbar__section-item' id='colors-section' data-value='colors-section'><a>Color schemes</a></li>
        <li className='navbar__section-item' id='movement-section' data-value='movement-section'><a>Object movement</a></li>
        <li className='navbar__section-item' id='help-section' data-value='help-section'><a>Help</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;