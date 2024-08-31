import { NavLink } from 'react-router-dom';
import style from "./menuLink.module.css";
import useIsActiveButton from "./HeaderViewRouter.js";
// import data from './LinkData.js';


function Header (){

    return (
        <ul className={style.HeaderMenu}>
          <li >
            <NavLink to={'/'} className={ useIsActiveButton('') ? `${style.MenuLink} ${style.active}` : style.MenuLink}>
              {'главная'}
            </NavLink>
          </li>
          {/* <li>
            <FallingList type='header' title='Колледжи' data={data} />
          </li> */}

          <li>
            <NavLink to={'/search'} className={ useIsActiveButton('search') ? `${style.MenuLink} ${style.active}` : style.MenuLink}>
              {'поиск'}
            </NavLink>
          </li>

          <li>
            <NavLink to={'/test'} className={ useIsActiveButton('test') ? `${style.MenuLink} ${style.active}` : style.MenuLink}>
              {'тесты'}
            </NavLink>
          </li>

          {/* <li>
            <NavLink to={'/guide'} className={ useIsActiveButton('guide') ? `${style.MenuLink} ${style.active}` : style.MenuLink}>
              {'Помощь'}
            </NavLink>
          </li> */}
      </ul>
    );
}

function Footer (){
    return (
        <ul className={style.FooterMenu}>
          <li >
            <NavLink to={'/'} className={style.MenuFooter}>
              {'главная'}
            </NavLink>
          </li>
          {/* <li>
            <FallingList type='footer' title='КОЛЛЕДЖИ' data={data} />
          </li> */}

          <li>
            <NavLink to={'/search'} className={ style.MenuFooter }>
              {'поиск'}
            </NavLink>
          </li>

          <li>
            <NavLink to={'/test'} className={ style.MenuFooter }>
              {'тесты'}
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