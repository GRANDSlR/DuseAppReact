import style from "./header.module.css";
// import CompanyIcon from "./img/CompanyIcon.png";
// import NewLogo from "./img/NewLogo.svg";
import SearchPanel from "../../../components/SearchPanel/SearchPanel.jsx";
import UserIcon from "./img/user2.png"
import FavIcon from './img/fav2.png';
import Menu from '../menu/menu.jsx';
import React, { useState, useEffect } from 'react';
import AuthHeader from '../../../components/AuthPanel/AuthPanel.jsx';
// import AdditionButton from './img/AdditionButton.svg';
import AdditionButton from '../../../components/SpecialtyFilterAdditionPanel/img/AdditionButtonNew.svg';
import PopUpWindow from '../../../components/PopUpWindow/PopUpWindow.jsx';
import {getCookies} from '../../../features/cookies/CookieService.js';
import UserProfile from '../../../components/UserProfile/UserProfile.jsx';
import CollegeAdditionForm from '../../../components/CollegeAdditionForm/CollegeAdditionForm.jsx';
import ErrorPanel from '../../../components/ErrorPanel/ErrorPanel.jsx';
//
import { observer } from 'mobx-react';
//
import UserModel from '../../../features/states/UserModel.js';
import PopUpState from '../../../features/states/PopUpState.js';
import ExceptionState from '../../../features/exceptions/ApplicationException.js';
//
import {createCollege} from '../../../entities/CollegeFetches.js';


const Header = observer(() => {

    const [isOpenAuth, setIsOpenAuth] = useState(false);

    const [isOpenCollegeAddition, setIsOpenCollegeAddition] = useState(false);

    const [isVerifyUsersCookies, setVerifyUsersCookies] = useState(false);

    const SetExceptionState = (state) => 
    {
      ExceptionState.setException(state, '');
    }

    const SetPopUpState = (state) => {

      PopUpState.setPopUpState(state, null);
    }

    useEffect(() => {

      const verify = async () =>{
        setVerifyUsersCookies(await UserModel.verifyUser());
      }
      verify();

    }, [getCookies('space-cookies'), UserModel.userData]);

    const createCollegeAction = async(data) => {

      if (data != null)
      {
        await createCollege(data)
        .then(createdCollege => {
            ExceptionState.setException(true, "Новая страница учреждения добавлена");
        })
        .catch(error => {
            ExceptionState.setException(true, "Ошибка создания страницы. " +`${error}`);
            console.error('Failed to create college page:', error);
        });
        setIsOpenCollegeAddition(!isOpenCollegeAddition)
      }
    }

  return (
    <div className={style.HeaderBar}>
      <div className={style.CompanyBar}>
        <span>Duse</span>
        <span>App</span>
      </div>

      <div className={style.linkBar}>
        <Menu type="header"/>

      </div>

      {UserModel.userData != null && isVerifyUsersCookies && JSON.parse(UserModel.userData).role === 0 && (
        <div className={style.CollegeAdditionButtonBox}>
          <img src={AdditionButton} className={isOpenCollegeAddition ? `${style.AdditionButton} ${style.open}` : style.AdditionButton} onClick={() => setIsOpenCollegeAddition(!isOpenCollegeAddition)}/>
          <PopUpWindow handleCodeBlock={<CollegeAdditionForm collegeId={null} actionFunc={createCollegeAction} data={null} closeEvent={setIsOpenCollegeAddition}/>}  handleState={isOpenCollegeAddition}  handleCloseEnent={setIsOpenCollegeAddition} windowType={'not-full'}/>
        </div>
      )}

      <div className={style.IconBar}>
        <img alt='favIcon' src={FavIcon}/>

        <img alt='userIcon' src={UserIcon} onClick={() => setIsOpenAuth(true)}/>
      </div>

      {UserModel.userData != null && isVerifyUsersCookies ? 
        <PopUpWindow handleCodeBlock={<UserProfile userData={JSON.parse(UserModel.userData)} closeEvent={setIsOpenAuth}/>}  handleState={isOpenAuth}  handleCloseEnent={setIsOpenAuth} windowType={'not-full'}/>
        : <PopUpWindow handleCodeBlock={<AuthHeader closeEvent={setIsOpenAuth}/>}  handleState={isOpenAuth}  handleCloseEnent={setIsOpenAuth} windowType={'full'}/>
      }


      {ExceptionState.getState() && 
        <PopUpWindow handleCodeBlock={<ErrorPanel closeEvent={SetExceptionState} errorMessage={ExceptionState.getMessage()} />}  handleState={ExceptionState.getState()}  handleCloseEnent={SetExceptionState} windowType={'full'}/>
      }

      {PopUpState.getState() && 
        <PopUpWindow handleCodeBlock={PopUpState.getCodeBlock()}  handleState={PopUpState.getState()}  handleCloseEnent={SetPopUpState} windowType={'full'}/>
      }

    </div>
  );
});

export default Header;
