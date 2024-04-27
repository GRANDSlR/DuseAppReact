// import { NavLink } from 'react-router-dom';
import style from "./Header.module.css";
import CompanyIcon from "./img/CompanyIcon.png";
import NewLogo from "./img/NewLogo.svg";
// import menuLinkStyle from "../Header/MenuLink.module.css";
// import FallingList from "../FallingList/FallingList.jsx";
// import useIsActiveButton from "./HeaderViewRouter.js";
import SearchPanel from "../SearchPanel/SearchPanel.jsx";
import UserIcon from "./img/DefaultUserIcon.svg"
import DuseAppIcon from './img/DuseApp.svg'
import Menu from '../Menu/Menu.jsx';


const Header = () => {

  return (
    <div className={style.HeaderBar}>
      <div className={style.IconBar}>
        {/* <img alt='logo' src={NewLogo} id={style.appLogo}/> */}
        {/* <img alt='companyTitle' src={CompanyIcon} id={style.appTitle}/> */}
        <img alt='companyTitle' src={DuseAppIcon} id={style.duseAppTitle}/>
      </div>

      <Menu type="header" />

      <SearchPanel title='поиск по названию'/> 

      <img alt='userIcon' src={UserIcon} id={style.UserIcon}/>
    </div>
  );
}

export default Header;
