
import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import style from "./Dropdown.module.css";
import Circumflexus from "./img/CircumflexusInvert.svg";
import CircumflexusGrey from "./img/CircumflexusGrey.svg";
import CircumflexusBlue from "./img/CircumflexusInvertBlue.svg";
import menuLinkStyle from "../Menu/MenuLink.module.css";
import useIsActiveButton from "../Menu/HeaderViewRouter.js"


const FallingList = ({type, title, link, data}) => {

  const [dropdownState, setDropdownState] = useState({ open: false });

  const handleDropdownClick = () =>
  setDropdownState({ open: !dropdownState.open });

  return (
    <div className={style.MainBox} >
      <div className={style.ParentLink} onClick={handleDropdownClick}  >
        <span
        className={ 
          type == 'header' ?
          (useIsActiveButton(link) ? `${menuLinkStyle.MenuLink} ${menuLinkStyle.active}` : menuLinkStyle.MenuLink)
        : menuLinkStyle.MenuFooter}>{title}</span>
        <img alt='Circumflexus' src={type == 'header' ? CircumflexusGrey : CircumflexusBlue} className={type == 'header' ? style.Circumflexus : style.CircumflexusBlue}/>
      </div>
      {dropdownState.open && (
      <ul className={type == 'header' ? style.DropdownMenu : `${style.DropdownMenu} ${style.near}`} onMouseLeave={handleDropdownClick}>
        {
          Array.isArray(data) ? 
          data.map((nav, index) => {
            return (
            <li key={index}>
              <NavLink to={nav.link} className={style.DropdownMenuLink}>
                {nav.title}
              </NavLink>
            </li>
            );
          })
        : null}
      </ul> 
      )}
    </div>
  );
}

export default FallingList;