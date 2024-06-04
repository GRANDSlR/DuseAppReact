import React, {useState, useEffect} from 'react';
import style from './CollegePage.module.css';
//
import currCollegeData from '../../services/CollegeGlobalStates.js';
//
import collegeType from './img/collegeType.png';
import ownership from './img/ownership.png';
import grade from './img/exam.png';
import location from './img/location.png';
//
import {getGradeItems} from '../../components/CollegeHandler/CollegePanel.jsx';
//
import {CollegeTypeFilterParams, Ownership, EducationFormFilterParams} from '../../services/DataCarrier.js';
//
import calculateDistance from '../../services/DistanceCalculationService.js';
//

const CollegePage = () => {

    const [userCoords, setUserCoords] = useState(null);

    const [college, setCollege] = useState(currCollegeData.data);

    const setUserLocation = () => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setUserCoords({lat: position.coords.latitude, long: position.coords.longitude});
        });
    }

    useEffect(() => {
        setUserLocation();
    }, []);

    const getSpecialtyItems = (college) => {

        let SpecialtyCostItemsArray = [];
      
        if (Array.isArray(college.specialtyList)) {
          college.specialtyList.forEach((item) => {
              SpecialtyCostItemsArray.push(
                <tr>
                    <td>{item.title}</td>
                    <td>{EducationFormFilterParams[item.educationForm]}</td>
                    <td>{parseInt(item.cost) === 0 ? 'Бюджет' : `${item.cost} BYN`}</td>
                    <td>{item.passingScore}</td>
                    <td>{item.freePlaces}</td>
                </tr>
              );
          });
        }

        if(SpecialtyCostItemsArray.length === 0)
            SpecialtyCostItemsArray = null;

        return SpecialtyCostItemsArray;
      };

    const getAvgCost = (college) => {

        let sum = 0;
        let count = 0;

        if (Array.isArray(college.specialtyList)) {
            college.specialtyList.forEach((item) => {
                sum+=parseFloat(item.cost);
                if(parseInt(item.cost) !== 0)
                    count++;
            })
            return sum / count;
        }

        return 0;
    }

    return (
        <div className={style.MainWindow}>
            <div className={style.HelloBox}>
                <div>
                    <p>{college.collegeHeader.title}</p>
                    <hr></hr>
                    <p className={style.CollegeTitle}>{college.collegeHeader.title}</p>
                </div>
            </div>
            <div className={style.WindowBack}>
                <div className={style.ContentPanel}>
                    <div className={style.MainContent}>
                        <div className={`${style.Content} ${style.Description}`}>
                            <p className={style.Headers}>Об учреждении</p>
                            
                            <div className={style.AdminBoxBack}>
                                <div className={style.AdminBox}>
                                    <div className={style.Item}>
                                        <img className={style.ItemImg} src={grade}></img>
                                        <div>
                                            <div className={style.StarPanel}>
                                                {getGradeItems(college.collegeDescription.grade)}
                                            </div>
                                            <p>Рейтинг</p>
                                        </div>
                                    </div>
                                    <div className={style.Item}>
                                        <img className={style.ItemImg} src={location}></img>
                                        <div>
                                            <p className={style.MiniHeader}>{college.collegeLocation.region}</p>
                                            <p>Локация</p>
                                        </div>
                                    </div>
                                </div>

                                <div className={style.AdminBox}>
                                    <div className={style.Item}>
                                        <img className={style.ItemImg} src={collegeType}></img>
                                        <div>
                                            <p className={style.MiniHeader}>{CollegeTypeFilterParams[college.collegeDescription.collegeType]}</p>
                                            <p>Тип учреждения</p>
                                        </div>
                                    </div>
                                    <div className={style.Item}>
                                        <img className={style.ItemImg} src={ownership}></img>
                                        <div>
                                            <p className={style.MiniHeader}>{Ownership[college.collegeDescription.ownership]}</p>
                                            <p>Форма собственности</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className={style.collegeDescription}>{college.collegeDescription.description}</p>
                        </div>

                        <div className={`${style.Content} ${style.Description}`}>

                            <p className={style.Headers}>Специальности</p>

                            {getSpecialtyItems(college) != null ? 
                            <table className={style.SpecialtyTable}>
                                <tbody>
                                    <tr>
                                        <th>Название</th>
                                        <th>Форма</th>
                                        <th>Стоимость</th>
                                        <th>Балл</th>
                                        <th>Количество мест</th>
                                    </tr>
                                    {getSpecialtyItems(college)}
                                </tbody>
                            </table>
                            : <p>Совпадений не найдено</p>}
                        </div>

                        <div className={`${style.Content} ${style.Description}`}>
                            
                            <p className={style.Headers}>Отзывы</p>
                            
                            
                        </div>
                    </div>
                    <div className={style.SecondaryContent}>

                        <div className={`${style.Content} ${style.Description}`}>
                            
                            <p className={style.Headers}>Стоимость</p>

                            <div className={style.Box}>
                                <p className={style.MiniHeader}>~ {parseInt(getAvgCost(college)) === 0 ? 'Бюджет' : getAvgCost(college).toFixed(2)} BYN</p>
                                <p>Средняя стоимоть обучения</p>
                            </div>
                        </div>

                        <div className={`${style.Content} ${style.Description}`}>
                            
                            <p className={style.Headers}>Контакты</p>
                            
                            <div className={style.Box}>
                                {/* <p className={style.MiniHeader}>{college.collegeHeader.title}</p> */}
                                <div className={style.ContactItemBox}>
                                    <p className={style.MiniHeader}>Сайт: </p>
                                    <p>{college.collegeDescription.webSiteRef}</p>
                                </div>
                                <div  className={style.ContactItemBox}>
                                    <p className={style.MiniHeader}>Локация: </p>
                                    <p>{college.collegeLocation.region}</p>

                                </div>
                                <div  className={style.ContactItemBox}>
                                    <p className={style.MiniHeader}>От вас: </p>
                                    {userCoords != null ? 
                                        <p> {calculateDistance(
                                        parseFloat(userCoords.lat), 
                                        parseFloat(userCoords.long), 
                                        parseFloat(college.collegeLocation.lat), 
                                        parseFloat(college.collegeLocation.long)
                                    )} км</p> :
                                    <p>Разрешите использование вашей геолокации</p>}
                                    
                                </div>

                                <div className={style.ButtonCase}>
                                    <a href={college.collegeDescription.webSiteRef} className={style.ConnectionButton}>Связаться с нами</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CollegePage;