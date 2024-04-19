import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import * as style from "./Header.module.css";
import CompanyIcon from "./img/CompanyIcon.png";
import NewLogo from "./img/NewLogo.png";
import Circumflexus from "./img/CircumflexusInvert.svg";

const data = [
	
  {
		title: 'Главная',
		link: '/',
	},
	{
		title: 'Колледжи',
		link: '/college',
	},
  {
		title: 'Тесты',
		link: '/test',
	}
];

const Header = () => {
  const [navs] = useState(data);

  return (
    <div className={style.HeaderBar}>
      <div className={style.IconBar}>
        <img alt='logo' src={NewLogo} id={style.appLogo}/>
        <img alt='companyTitle' src={CompanyIcon} id={style.appTitle}/>
      </div>
      <ul className={style.HeaderMenu}>
        {navs.map((nav, index) => (
          <li key={index}>
            <NavLink to={nav.link} className={style.MenuLink}>
              {nav.title}
            </NavLink>
            <img alt='Circumflexus' src={Circumflexus} className={style.Circumflexus}/>
          </li>
        ))}
      </ul> 
    </div>
  );
}

export default Header;
