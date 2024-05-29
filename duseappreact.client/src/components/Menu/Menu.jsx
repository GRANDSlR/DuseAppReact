import { NavLink } from 'react-router-dom';
import style from "./MenuLink.module.css";
import FallingList from "../FallingList/FallingList.jsx";
import useIsActiveButton from "./HeaderViewRouter.js";
import data from './LinkData.js';


function Header (){

    return (
        <ul className={style.HeaderMenu}>
          <li >
            <NavLink to={'/'} className={ useIsActiveButton('') ? `${style.MenuLink} ${style.active}` : style.MenuLink}>
              {'Главная'}
            </NavLink>
          </li>
          <li>
            <FallingList type='header' title='Колледжи' data={data} />
          </li>

          <li>
            <NavLink to={'/test'} className={ useIsActiveButton('test') ? `${style.MenuLink} ${style.active}` : style.MenuLink}>
              {'Тесты'}
            </NavLink>
          </li>
      </ul>
    );
}

function Footer (){
    return (
        <ul className={style.FooterMenu}>
          <li >
            <NavLink to={'/'} className={style.MenuFooter}>
              {'ГЛАВНАЯ'}
            </NavLink>
          </li>
          <li>
            <FallingList type='footer' title='КОЛЛЕДЖИ' data={data} />
          </li>

          <li>
            <NavLink to={'/test'} className={ style.MenuFooter }>
              {'ТЕСТЫ'}
            </NavLink>
          </li>
      </ul>
    );
}

export default function Menu ({type, linkData}){

    return (
        <div>
            {type == "header" ? <Header /> : <Footer />}
        </div>
    );
}