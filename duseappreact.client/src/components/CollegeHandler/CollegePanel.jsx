import React, {useState, useEffect} from 'react'
import style from './CollegePanel.module.css';
import { NavLink } from 'react-router-dom';

//
import SpecialtyPanel from '../SpecialtyPanel/SpecialtyPanel.jsx';
//
import websitePin from './img/AdmitistrationPanel/WebsitePin.svg';
import locationPin from './img/AdmitistrationPanel/LocationPin.svg';
//
import heartFull from './img/SaveButton/heart.svg';
import heartEmpty from './img/SaveButton/check-mark.svg';
//
import FullStar from './img/FullStar.png';
import EmptyStar from './img/EmptyStar.png';
import PartedStar from './img/PartedStar.png';
//
import GradePanel from '../GradePanel/GradePanel.jsx';
//
import {getCookies} from '../../features/cookies/CookieService.js';
//
import ExceptionState from '../../features/exceptions/ApplicationException.js';
import UserModel from '../../features/states/UserModel.js';
//
import { observer } from 'mobx-react';
//
import currCollegeData from '../../features/states/CollegeGlobalStates.js';
//
import calculateDistance from '../../processes/DistanceCalculationService.js';



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

    const [userCoords, setUserCoords] = useState(null);

    // const setUserLocation = () => {
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //         setUserCoords({lat: position.coords.latitude, long: position.coords.longitude});
    //     });
    // }

    const getUserLocation = () => {
        if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
        function(position) 
        {
            
          setUserCoords({lat: position.coords.latitude, long: position.coords.longitude});

        });
        } 
      else
       {
      console.log("Геолокация не поддерживается вашим браузером.");
      }
      }

    useEffect(() => {
        getUserLocation();
    }, []);

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

                    <NavLink to={'/page'}  id={style.collegeTitle} onClick={() => currCollegeData.setData(college)}>
                        {college.collegeHeader.title}
                    </NavLink>
                    <p id={style.collegeLocationHeader}>{college.collegeLocation.region}</p>


                    {/* <div className={style.StarPanel}>
                        <div onClick={() => setIsOpenGragePanel(index)}>{getGradeItems(college.collegeDescription.grade)}</div>
                        {(isOpenGragePanel === index && isOpenGragePanel != null) && ( verifyUser() && (
                            <div className={style.GradePanelBox}>
                                <GradePanel closeEvent={setIsOpenGragePanel} collegeId={college.collegeHeader.collegeId}/>
                            </div>
                        ))}
                    </div> */}

                    <SpecialtyPanel  actionClick={null} speсialtyList={college.specialtyList.map((item) => item.title)}/>

                    <div className={style.InfoPanel}>

                        <div className={style.AdministrationPanel}>
                            <div>
                                <img src={websitePin} />
                                <a className={style.collegeRef} href={college.collegeDescription.webSiteRef}>{college.collegeDescription.webSiteRef}</a>
                            </div>
                            <div>
                                <img src={locationPin} />
                                <p>
                                    {userCoords != null ? 
                                        <span> {calculateDistance(
                                        parseFloat(userCoords.lat), 
                                        parseFloat(userCoords.long),
                                        parseFloat(college.collegeLocation.lat),
                                        parseFloat(college.collegeLocation.long) 

                                    )} км</span> :
                                    <span>Разрешите использование вашей геолокации</span>}
                                </p>
                            </div>
                        </div>

                        <div className={savedCollegesArray.includes(`${JSON.stringify(college)}`) ? `${style.SaveButton} ${style.Empty} `: style.SaveButton} onClick={() => addToVaf(college)}>
                            <img src={savedCollegesArray.includes(`${JSON.stringify(college)}`) ? heartEmpty : heartFull} />
                            {/* <p>{savedCollegesArray.includes(`${JSON.stringify(college)}`) ? 'Сохранено' : 'Сохранить'}</p> */}
                        </div>

                        {/* <div className={savedCollegesArray.includes(`${JSON.stringify(college)}`) ? `${style.SaveButton} ${style.Empty} `: style.SaveButton} onClick={() => addToVaf(college)}>
                            <img src={savedCollegesArray.includes(`${JSON.stringify(college)}`) ? heartEmpty : heartFull} />
                            <p>{savedCollegesArray.includes(`${JSON.stringify(college)}`) ? 'Сохранено' : 'Сохранить'}</p>
                        </div> */}
                    </div>
                </div>
            ) : <div className={style.ReportMessage}><p>Совпадений не найдено</p></div>}
        </div>
    );
});