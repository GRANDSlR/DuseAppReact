import style from "./Header.module.css";
import CompanyIcon from "./img/CompanyIcon.png";
import NewLogo from "./img/NewLogo.svg";
import SearchPanel from "../SearchPanel/SearchPanel.jsx";
import UserIcon from "./img/DefaultUserIcon.svg"
import DuseAppIcon from './img/DuseApp.svg'
import Menu from '../Menu/Menu.jsx';
import React, { useState } from 'react';
import AuthHeader from '../AuthPanel/AuthPanel.jsx';
import { NavLink } from 'react-router-dom';

const Header = () => {

    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
      setIsOpen(true);
    };

  return (
    <div className={style.HeaderBar}>
      <div className={style.IconBar}>
        <img alt='companyTitle' src={DuseAppIcon} id={style.duseAppTitle}/>
      </div>

      <Menu type="header"/>

      <SearchPanel title='поиск по названию' /> 

      <img alt='userIcon' src={UserIcon} id={style.UserIcon} onClick={openModal}/>

      {isOpen && (
          <div>
            <div className={style.AuthBack} onClick={closeModal}></div>
              <div className={style.AuthHeader}>
                  <AuthHeader closeEvent={closeModal}/>
              </div>
          </div>
      )}

    </div>
  );
}

export default Header;
