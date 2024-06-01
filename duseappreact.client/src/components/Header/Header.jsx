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
import {getCookies} from '../../services/CookieService.js';
import UserProfile from '../UserProfile/UserProfile.jsx';
//
import ExceptionState from '../../services/ApplicationException.js';
//
import { observer } from 'mobx-react';
//
import UserModel from '../../services/User/UserModel.js';
//
import ErrorPanel from '../ErrorPanel/ErrorPanel.jsx';


const Header = observer(() => {



    const [isOpenAuth, setIsOpenAuth] = useState(false);

    const [isOpenCollegeAddition, setIsOpenCollegeAddition] = useState(false);

    const [isVerifyUsersCookies, setVerifyUsersCookies] = useState(false);

    const SetExceptionState = (state) => 
    {
      ExceptionState.setException(state, '');
    }

    useEffect(() => {

      const verify = async () =>{
        setVerifyUsersCookies(await UserModel.verifyUser());
      }
      verify();

    }, [getCookies('space-cookies'), UserModel.userData]);


  return (
    <div className={style.HeaderBar}>
      <div className={style.IconBar}>
        <img alt='companyTitle' src={DuseAppIcon} id={style.duseAppTitle}/>
      </div>

      <Menu type="header"/>

      <SearchPanel title='поиск по названию' /> 

      {UserModel.userData != null && isVerifyUsersCookies && JSON.parse(UserModel.userData).role === 0 && (
        <div className={style.CollegeAdditionButtonBox}>
          <img src={AdditionButton} className={isOpenCollegeAddition ? `${style.AdditionButton} ${style.open}` : style.AdditionButton} onClick={() => setIsOpenCollegeAddition(!isOpenCollegeAddition)}/>
          <PopUpWindow handleCodeBlock={<AuthHeader closeEvent={setIsOpenAuth}/>}  handleState={isOpenCollegeAddition}  handleCloseEnent={setIsOpenCollegeAddition} windowType={'not-full'}/>
        </div>
      )}

      <img alt='userIcon' src={UserIcon} id={style.UserIcon} onClick={() => setIsOpenAuth(true)}/>

      {UserModel.userData != null && isVerifyUsersCookies ? 
        <PopUpWindow handleCodeBlock={<UserProfile userData={JSON.parse(UserModel.userData)} closeEvent={setIsOpenAuth}/>}  handleState={isOpenAuth}  handleCloseEnent={setIsOpenAuth} windowType={'not-full'}/>
        : <PopUpWindow handleCodeBlock={<AuthHeader closeEvent={setIsOpenAuth}/>}  handleState={isOpenAuth}  handleCloseEnent={setIsOpenAuth} windowType={'full'}/>
      }


      {ExceptionState.getState() && 
        <PopUpWindow handleCodeBlock={<ErrorPanel closeEvent={SetExceptionState} errorMessage={ExceptionState.getMessage()} />}  handleState={ExceptionState.getState()}  handleCloseEnent={SetExceptionState} windowType={'full'}/>
      }

    </div>
  );
});

export default Header;
