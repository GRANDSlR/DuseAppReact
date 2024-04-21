
import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import style from "./Dropdown.module.css";
import Circumflexus from "./img/CircumflexusInvert.svg";
import menuLinkStyle from "../Header/MenuLink.module.css";
import useIsActiveButton from "../Header/HeaderViewRouter.js"


const FallingList = ({title, link, data}) => {

  const [dropdownState, setDropdownState] = useState({ open: false });

  const handleDropdownClick = () =>
  setDropdownState({ open: !dropdownState.open });

  return (
    <div className={style.MainBox} >
      <div className={style.ParentLink} >
        <span className={ useIsActiveButton(link) ? `${menuLinkStyle.MenuLink} ${menuLinkStyle.active}` : menuLinkStyle.MenuLink} onClick={handleDropdownClick} >{title}</span>
        <img alt='Circumflexus' src={Circumflexus} className={style.Circumflexus}/>
      </div>
      {dropdownState.open && (
      <ul className={style.DropdownMenu} onMouseLeave={handleDropdownClick}>
        {data.map((nav, index) => (
          <li key={index}>
            <NavLink to={nav.link} className={style.DropdownMenuLink}>
              {nav.title}
            </NavLink>
          </li>
        ))}
      </ul> 
      )}
    </div>
  );
}

export default FallingList;