import React, {useState, useEffect} from 'react'
import style from './CollegePanel.module.css';
import { NavLink } from 'react-router-dom';

//
import SpecialtyPanel from '../SpecialtyPanel/SpecialtyPanel.jsx';
//
import websitePin from './img/AdmitistrationPanel/worlwide.png';
import locationPin from './img/AdmitistrationPanel/location.png';
//
import heartFull from './img/SaveButton/heartFull.png';
import heartEmpty from './img/SaveButton/heartEmpty.png';
//
import FullStar from './img/FullStar.png';
import EmptyStar from './img/EmptyStar.png';
import PartedStar from './img/PartedStar.png';
//
import GradePanel from '../GradePanel/GradePanel.jsx';
//
import {getCookies} from '../../services/CookieService.js';
//
import ExceptionState from '../../services/ApplicationException.js';
import UserModel from '../../services/User/UserModel.js';
//
import { observer } from 'mobx-react';
//
import currCollegeData from '../../services/CollegeGlobalStates.js';



export const getGradeItems = (grade) => {
    const gradeTail = parseFloat(grade) % 1;

    const result = [];
  
    for (let i = 0; i < grade-gradeTail; i++) {
      result.push(<img src={FullStar} />);
    }
  
    if (gradeTail !== 0) {
      result.push(<img src={PartedStar} />);
    }
  
    for (let i = 0; i < 5 - Math.ceil(grade); i++) {
      result.push(<img src={EmptyStar} />);
    }
  
    return result;
  };    

export const Colleges = observer(({collegeObjects}) => {

    const [isVerifyUsersCookies, setVerifyUsersCookies] = useState(false);

    const verifyUser = () => {
        if(sessionStorage.getItem('userModel') !== 'null' && isVerifyUsersCookies)
            return true;
        else{
            ExceptionState.setException(true, 'Ошибка доступа. Эта функция доступна только зарегистрированным пользователям');
            setIsOpenGragePanel(null);
            return false;
        }
    }

    useEffect(() => {

        const verify = async () =>{
          setVerifyUsersCookies(await UserModel.verifyUser());
        }
        verify();
  
      }, [getCookies('space-cookies'), UserModel.userData]);

    const [savedCollegesArray, setSavedCollegesArray] = useState(
        sessionStorage.getItem('savedColleges') != null ?
        JSON.parse(sessionStorage.getItem('savedColleges')) : ['']);

    const [isOpenGragePanel, setIsOpenGragePanel] = useState(null);

    const addToVaf = (college) => {
          
        if(savedCollegesArray.includes(`${JSON.stringify(college)}`))
        {
            const newSavedCollegesArray = savedCollegesArray.filter(item => item!='' && JSON.parse(item).collegeHeader.collegeId != `${college.collegeHeader.collegeId}`)
            setSavedCollegesArray(newSavedCollegesArray);
            sessionStorage.setItem('savedColleges', JSON.stringify(newSavedCollegesArray));
        }
        else {
            savedCollegesArray.push(`${JSON.stringify(college)}`)
            setSavedCollegesArray([...savedCollegesArray])
            sessionStorage.setItem('savedColleges', JSON.stringify(savedCollegesArray));
        }
    }
      
    return (
        <div className={style.Cards}>
            {collegeObjects != null || (Array.isArray(collegeObjects) && collegeObjects.length>0) ? collegeObjects.map((college, index) => 
                <div className={style.CollegeCard} key={index}>

                    <NavLink to={'/collegePage'}  id={style.collegeTitle} onClick={currCollegeData.setData(college)}>
                        {college.collegeHeader.title}
                    </NavLink>
                    <p id={style.collegeLocationHeader}>{college.collegeLocation.region}</p>

                    <div className={style.StarPanel}>
                        <div onClick={() => setIsOpenGragePanel(index)}>{getGradeItems(college.collegeDescription.grade)}</div>
                        {(isOpenGragePanel === index && isOpenGragePanel != null) && ( verifyUser() && (
                            <div className={style.GradePanelBox}>
                                <GradePanel closeEvent={setIsOpenGragePanel} collegeId={college.collegeHeader.collegeId}/>
                            </div>
                        ))}
                    </div>

                    <SpecialtyPanel speсialtyList={college.specialtyList.map((item) => item.title)}/>

                    <div className={style.AdministrationPanel}>
                        <div>
                            <img src={websitePin} />
                            <p>{college.collegeDescription.webSiteRef}</p>
                        </div>
                        <div>
                            <img src={locationPin} />
                            <p>{college.collegeLocation.region}</p>
                        </div>
                    </div>

                    <div className={savedCollegesArray.includes(`${JSON.stringify(college)}`) ? `${style.SaveButton} ${style.Empty} `: style.SaveButton} onClick={() => addToVaf(college)}>
                        <img src={savedCollegesArray.includes(`${JSON.stringify(college)}`) ? heartEmpty : heartFull} />
                        <p>{savedCollegesArray.includes(`${JSON.stringify(college)}`) ? 'Сохранено' : 'Сохранить'}</p>
                    </div>
                </div>
            ) : <div className={style.ReportMessage}><p>Совпадений не найдено</p></div>}
        </div>
    );
});