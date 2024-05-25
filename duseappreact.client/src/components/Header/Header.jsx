import style from "./Header.module.css";
// import CompanyIcon from "./img/CompanyIcon.png";
// import NewLogo from "./img/NewLogo.svg";
import SearchPanel from "../SearchPanel/SearchPanel.jsx";
import UserIcon from "./img/DefaultUserIcon.svg"
import DuseAppIcon from './img/DuseApp.svg'
import Menu from '../Menu/Menu.jsx';
import React, { useState, useEffect } from 'react';
import AuthHeader from '../AuthPanel/AuthPanel.jsx';
import AdditionButton from './img/AdditionButton.svg';
import PopUpWindow from '../PopUpWindow/PopUpWindow.jsx';
import {verifyUsersCookies, getCookies} from '../../services/UserService.js';
import UserProfile from '../UserProfile/UserProfile.jsx';

const Header = () => {

    const [isOpenAuth, setIsOpenAuth] = useState(false);

    const [isOpenCollegeAddition, setIsOpenCollegeAddition] = useState(false);

    const [isVerifyUsersCookies, setVerifyUsersCookies] = useState(false);

    useEffect(() => {

      const verify = async () =>{
        setVerifyUsersCookies(await verifyUsersCookies());
      }
      verify();

    }, [getCookies('space-cookies')]);

  return (
    <div className={style.HeaderBar}>
      <div className={style.IconBar}>
        <img alt='companyTitle' src={DuseAppIcon} id={style.duseAppTitle}/>
      </div>

      <Menu type="header"/>

      <SearchPanel title='поиск по названию' /> 

      {sessionStorage.getItem('userModel') != null && isVerifyUsersCookies && JSON.parse(sessionStorage.getItem('userModel')).role === 0 && (
        <div className={style.CollegeAdditionButtonBox}>
          <img src={AdditionButton} className={isOpenCollegeAddition ? `${style.AdditionButton} ${style.open}` : style.AdditionButton} onClick={() => setIsOpenCollegeAddition(!isOpenCollegeAddition)}/>
          <PopUpWindow handleCodeBlock={<AuthHeader closeEvent={setIsOpenAuth}/>}  handleState={isOpenCollegeAddition}  handleCloseEnent={setIsOpenCollegeAddition} windowType={'not-full'}/>
        </div>
      )}

      <img alt='userIcon' src={UserIcon} id={style.UserIcon} onClick={() => setIsOpenAuth(true)}/>

      {sessionStorage.getItem('userModel') != null && isVerifyUsersCookies ? 
        <PopUpWindow handleCodeBlock={<UserProfile userData={JSON.parse(sessionStorage.getItem('userModel'))} closeEvent={setIsOpenAuth}/>}  handleState={isOpenAuth}  handleCloseEnent={setIsOpenAuth} windowType={'not-full'}/>
        : <PopUpWindow handleCodeBlock={<AuthHeader closeEvent={setIsOpenAuth}/>}  handleState={isOpenAuth}  handleCloseEnent={setIsOpenAuth} windowType={'full'}/>
      }
      {/* <PopUpWindow handleCodeBlock={<AuthHeader closeEvent={setIsOpenAuth}/>}  handleState={isOpenAuth}  handleCloseEnent={setIsOpenAuth} windowType={'full'}/> */}

    </div>
  );
}

export default Header;
