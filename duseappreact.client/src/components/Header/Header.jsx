import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import style from "./Header.module.css";
import menuLinkStyle from "../Header/MenuLink.module.css";
import CompanyIcon from "./img/CompanyIcon.png";
import NewLogo from "./img/NewLogo.svg";
import FallingList from "../FallingList/FallingList.jsx";
import useIsActiveButton from "./HeaderViewRouter.js";
import SearchPanel from "../SearchPanel/SearchPanel.jsx";
import UserIcon from "./img/DefaultUserIcon.svg"
import DuseAppIcon from './img/DuseApp.svg'

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
        {/* <img alt='logo' src={NewLogo} id={style.appLogo}/> */}
        {/* <img alt='companyTitle' src={CompanyIcon} id={style.appTitle}/> */}
        <img alt='companyTitle' src={DuseAppIcon} id={style.duseAppTitle}/>
      </div>
      <ul className={style.HeaderMenu}>
          <li >
            <NavLink to={'/'} className={ useIsActiveButton('') ? `${menuLinkStyle.MenuLink} ${menuLinkStyle.active}` : menuLinkStyle.MenuLink}>
              {'Главная'}
            </NavLink>
          </li>
          <li>
            <NavLink to={'/college'} className={ useIsActiveButton('college') ? `${menuLinkStyle.MenuLink} ${menuLinkStyle.active}` : menuLinkStyle.MenuLink}>
              {'Колледжи'}
            </NavLink>
          </li>
          <li>
            <FallingList title='Тесты' link='test' data={data} />
          </li>
      </ul>
      <SearchPanel title='поиск по названию'/> 
      <img alt='userIcon' src={UserIcon} id={style.UserIcon}/>
    </div>
  );
}

export default Header;
