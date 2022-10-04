import React from 'react';
import './MainMenu.css';
const MainMenu = () => {

  function handleHelpButtonClick(){
    let mainMenu=document.querySelector(".main-menu");
    console.log(mainMenu)
    mainMenu.style.display="none";
  }
  return (
    <div className='main-menu'>
      <div className='main-menu__left-side'>
        <h1 className='main-menu__logo'>M</h1>
        <button className='main-menu__button main-menu__help-button button' type='button' onClick={handleHelpButtonClick}>Help</button>
      </div>
      <div className='main-menu__right-side'>
        <ul className='main-menu__section-list'>
          <li className='main-menu__section-item'>
            <button className='main-menu__button main-menu__section-button button'>Fractals</button>
          </li>
          <li className='main-menu__section-item'>
            <button className='main-menu__button main-menu__section-button button'>Color schemes</button>
          </li>
          <li className='main-menu__section-item'>
            <button className='main-menu__button main-menu__section-button button'>Object movement</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MainMenu;