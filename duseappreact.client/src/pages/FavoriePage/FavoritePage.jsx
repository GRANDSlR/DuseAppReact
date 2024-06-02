
import React, {useState } from 'react';
import style from './FavoritePage.module.css';
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

const FavoritePage = () => {

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

    const SpecialtyCheckboxEvent = (state) => 
    setCurrSpecialties(state);

    return (
        <div className={style.MainWindow}>
            <div className={style.HelloBox}>
                <p id={style.HelloTitle}>НАЧНИ ИССЛЕДОВАТЬ СЕЙЧАС</p>
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
                            <th className={style.HeaderInfo}>
                                <img src={Geolocation} id={style.LocationImg}></img>
                                <div>
                                    <p className={style.THTitle}>ГЕОЛОКАЦИЯ</p>
                                    <p>Дистанция от вас</p>
                                </div>
                            </th>
                            <th className={style.HeaderInfo}>
                                <img src={Specialization} id={style.SpecializationImg}></img>
                                <div>
                                    <p className={style.THTitle}>АТТЕСТАТ</p>
                                    <p>Ваш проходной балл</p>
                                </div>
                            </th>
                            <th className={style.HeaderInfo}>
                                <img src={Money} id={style.CostImg}></img>
                                <div>
                                    <p className={style.THTitle}>СТОИМОСТЬ</p>
                                    <p>Цена обучения за год</p>
                                </div>
                            </th>
                            <th className={style.HeaderInfo}>
                                <img src={Peoples} id={style.PeoplesImg}></img>
                                <div>
                                    <p className={style.THTitle}>КОЛИЧЕСТВО МЕСТ</p>
                                    <p>Набор мест на специальность</p>
                                </div>
                            </th>
                            <th className={style.HeaderInfo}>
                                <img src={Grade} id={style.GradeImg}></img>
                                <div>
                                    <p className={style.THTitle}>РЕЙТИНГ</p>
                                    <p>Внутренний рейтинг учреждения</p>
                                </div>
                            </th>
                            <th className={style.HeaderInfo}>
                                <img src={Ownership} id={style.OwnershipImg}></img>
                                <div>
                                    <p className={style.THTitle}>СОБСТВЕННОСТЬ</p>
                                    <p>Форма собственности учреждения</p>
                                </div>
                            </th>
                        </tr>
                        
                        {Array.isArray(getCollegeObjectArray()) && getCollegeObjectArray()!='' ? getCollegeObjectArray().map((college, index) => 
                            <tr key={index}>
                                <td className={style.TableCollegeHeader}>
                                    <p className={style.CollegeTitle}>{college.collegeHeader.title}</p>
                                    <p>{college.collegeLocation.region}</p>
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td><div className={style.GradeBox}>{getGradeItems(college.collegeDescription.grade)}</div></td>
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
}

export default FavoritePage;