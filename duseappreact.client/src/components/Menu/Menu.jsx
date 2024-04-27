import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import style from "./MenuLink.module.css";
import FallingList from "../FallingList/FallingList.jsx";
import useIsActiveButton from "./HeaderViewRouter.js";
import linkData from './LinkData.js';

function Header (data){
    return (
        <ul className={style.HeaderMenu}>
          <li >
            <NavLink to={'/'} className={ useIsActiveButton('') ? `${style.MenuLink} ${style.active}` : style.MenuLink}>
              {'Главная'}
            </NavLink>
          </li>
          <li>
            <NavLink to={'/college'} className={ useIsActiveButton('college') ? `${style.MenuLink} ${style.active}` : style.MenuLink}>
              {'Колледжи'}
            </NavLink>
          </li>
          <li>
            <FallingList type='header' title='Тесты' link='test' data={data} />
          </li>
      </ul>
    );
}

function Footer (data){
    return (
        <ul className={style.HeaderMenu}>
          <li >
            <NavLink to={'/'} className={style.MenuFooter}>
              {'ГЛАВНАЯ'}
            </NavLink>
          </li>
          <li>
            <NavLink to={'/college'} className={style.MenuFooter}>
              {'КОЛЛЕДЖИ'}
            </NavLink>
          </li>
          <li>
            <FallingList type='footer' title='ТЕСТЫ' link='test' data={data} />
          </li>
      </ul>
    );
}

export default function Menu (type){

  const [navs] = useState(linkData);

    return (
        <div>
            {type == "header" ? <Header data={navs}/> : <Footer data={navs}/>}
        </div>
    );
}