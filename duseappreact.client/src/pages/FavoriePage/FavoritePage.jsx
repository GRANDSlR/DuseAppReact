
import React, {useState, useEffect } from 'react';
import style from './FavoritePage.module.css';
import { NavLink } from 'react-router-dom';
//
import Avatar from './img/Avatar.png';
//
import Geolocation from './img/Tracking.png';
import Specialization from './img/Specialization.png';
import Peoples from './img/Peoples.png';
import Ownership from './img/Ownership.png';
import Money from './img/Money.png';
import Grade from './img/Grade.png';
//
import {Ownership as OwnershipData} from '../../services/DataCarrier.js';
//
import {getGradeItems} from '../../components/CollegeHandler/CollegePanel.jsx';
//
import SpecialtyFilterAdditionPanel from '../../components/SpecialtyFilterAdditionPanel/SpecialtyFilterAdditionPanel.jsx';
//
import calculateDistance from '../../services/DistanceCalculationService.js';
//
import {EducationFormFilterParams} from '../../services/DataCarrier.js';
//
import { observer } from 'mobx-react';
//
import currCollegeData from '../../services/CollegeGlobalStates.js';


const FavoritePage = observer(() => {

    const [userCoords, setUserCoords] = useState(null);

    const [savedCollegesArray, setSavedCollegesArray] = useState(
        sessionStorage.getItem('savedColleges') != null ?
        JSON.parse(sessionStorage.getItem('savedColleges')) : ['']);

    const [currSpecialties, setCurrSpecialties] = useState(
        sessionStorage.getItem('specialtyFavParams') != null ? 
        sessionStorage.getItem('specialtyFavParams').split(',') : []);

    const getCollegeObjectArray = () => {

        let newCollegeArray = [];

        savedCollegesArray.map((college) => {
            college != '' && newCollegeArray.push(JSON.parse(college));
        });

        return newCollegeArray;
    }

    const setUserLocation = () => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setUserCoords({lat: position.coords.latitude, long: position.coords.longitude});
        });
    }

    useEffect(() => {
        setUserLocation();
    }, []);

    const SpecialtyCheckboxEvent = (state) => 
    setCurrSpecialties(state);

    const getSpecialtyItems = (college) => {

        let SpecialtyCostItemsArray = [];
      
        if (Array.isArray(college.specialtyList)) {
          college.specialtyList.forEach((item) => {
            if (currSpecialties.includes(item.title)) {
              SpecialtyCostItemsArray.push(
                <tr>
                    <td>{item.title}</td>
                    <td>{EducationFormFilterParams[item.educationForm]}</td>
                    <td>{parseInt(item.cost) === 0 ? 'Бюджет' : `${item.cost} BYN`}</td>
                    <td>{item.passingScore}</td>
                </tr>
              );
            }
          });
        }

        if(SpecialtyCostItemsArray.length === 0)
            SpecialtyCostItemsArray = null;

        return SpecialtyCostItemsArray;
      };
      

    return (
        <div className={style.MainWindow}>
            <div className={style.HelloBox}>
                {/* <p id={style.HelloTitle}>НАЧНИ ИССЛЕДОВАТЬ СЕЙЧАС</p> */}
                <p id={style.HelloTitle}>Начни исследовать сейчас</p>
                <p id={style.HelloDescription}>Войдите в аккаунт чтобы получить полный доступ к функционалу нашего сервиса </p>
                <button type='submit' className={style.UserAuthButton}>
                    <img src={Avatar}></img>
                    Войти в аккаунт
                </button>
            </div>
            <div className={style.WindowBack}>
                <div className={style.ContentPanel}>
                    <table>
                    <tbody>
                        <tr>
                            <th className={style.SpecialtyPanel}>
                                <SpecialtyFilterAdditionPanel event={SpecialtyCheckboxEvent} sessionStorageName={'specialtyFavParams'}/>
                            </th>
                            <th className={style.HeaderInfo} id={style.Location}>
                                {/* <img src={Geolocation}></img> */}
                                <div>
                                    <p className={style.THTitle}>ГЕОЛОКАЦИЯ</p>
                                    <p>Дистанция от вас</p>
                                </div>
                            </th>
                            <th className={style.HeaderInfo} id={style.Specialization}>
                                {/* <img src={Specialization}></img> */}
                                <div>
                                    <p className={style.THTitle}>СПЕЦИАЛЬНОСТИ</p>
                                    <p>Описание выбранных специальностей</p>
                                </div>
                            </th>
                            <th className={style.HeaderInfo} id={style.Grade}>
                                {/* <img src={Grade}></img> */}
                                <div>
                                    <p className={style.THTitle}>РЕЙТИНГ</p>
                                    <p>Внутренний рейтинг учреждения</p>
                                </div>
                            </th>
                            <th className={style.HeaderInfo} id={style.Ownership}>
                                {/* <img src={Ownership}></img> */}
                                <div>
                                    <p className={style.THTitle}>СОБСТВЕННОСТЬ</p>
                                    <p>Форма собственности учреждения</p>
                                </div>
                            </th>
                        </tr>
                        
                        {Array.isArray(getCollegeObjectArray()) && getCollegeObjectArray()!='' ? getCollegeObjectArray().map((college, index) => 
                            <tr key={index}>
                                <td className={style.TableCollegeHeader}>
                                    <NavLink to={'/page'}  className={style.CollegeTitle} onClick={() => currCollegeData.setData(college)}>
                                        {college.collegeHeader.title}
                                    </NavLink>
                                    <p>{college.collegeLocation.region}</p>
                                </td>
                                <td>{userCoords != null ? 
                                    <p>{calculateDistance(
                                    parseFloat(userCoords.lat), 
                                    parseFloat(userCoords.long), 
                                    parseFloat(college.collegeLocation.lat), 
                                    parseFloat(college.collegeLocation.long)
                                    )} км</p> :
                                    <p>Разрешите использование вашей геолокации</p>}
                                </td>
                                <td className={style.SpecialtyParamsTableItem}>
                                    
                                    {getSpecialtyItems(college) != null ? 
                                    <table className={style.SpecialtyTable}>
                                        <tbody>
                                            <tr>
                                                <th>Название</th>
                                                <th>Форма</th>
                                                <th>Стоимость</th>
                                                <th>Балл</th>
                                            </tr>
                                            {getSpecialtyItems(college)}
                                        </tbody>
                                    </table>
                                    : <p>Совпадений не найдено</p>}
                                </td>
                                <td>
                                    <div className={style.GradeBox}>
                                        {getGradeItems(college.collegeDescription.grade)}
                                    </div>
                                </td>
                                <td>{OwnershipData[parseInt(college.collegeDescription.ownership)]}</td>
                            </tr>
                        )
                        : (
                            <tr>
                                <td>---//---</td>
                                <td>---//---</td>
                                <td>---//---</td>
                                <td>---//---</td>
                                <td>---//---</td>
                            </tr>
                        )}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
});

export default FavoritePage;