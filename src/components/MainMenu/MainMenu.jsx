import React from 'react';
import './MainMenu.css';
const MainMenu = () => {

  function hideMainMenu(){
    let mainMenu=document.querySelector(".main-menu");
    mainMenu.style.display="none";
  }
  function handleHelpButtonClick(){
    hideMainMenu();
  }
  function handleClick(e){
    console.log(e);
    let target='#'+e.target.dataset['value'];
    console.log(target);
    let sectionItem=document.querySelector(target);
    console.log(sectionItem);
    let event = new Event("click");
    sectionItem.dispatchEvent(event);
    hideMainMenu();
  }
  return (
    <div className='main-menu'>
      <div className='main-menu__left-side'>
        <h1 className='main-menu__logo'>M</h1>
        <button className='main-menu__button main-menu__help-button button' data-value='help-section' type='button' onClick={(e)=>handleClick(e)}>Help</button>
      </div>
      <div className='main-menu__right-side'>
        <ul className='main-menu__section-list'>
          <li className='main-menu__section-item'>
            <button className='main-menu__button main-menu__section-button button' data-value='fractal-section' type='button' onClick={(e)=>handleClick(e)}>Fractals</button>
          </li>
          <li className='main-menu__section-item'>
            <button className='main-menu__button main-menu__section-button button' data-value='colors-section' type='button' onClick={(e)=>handleClick(e)}>Color schemes</button>
          </li>
          <li className='main-menu__section-item'>
            <button className='main-menu__button main-menu__section-button button' data-value='movement-section' type='button' onClick={(e)=>handleClick(e)}>Object movement</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MainMenu;