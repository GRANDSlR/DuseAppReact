import React, {useState, useEffect} from 'react';
import style from './CollegePage.module.css';

///
import currCollegeData from '../../services/CollegeGlobalStates.js';
//
import collegeType from './img/collegeType.png';
import ownership from './img/ownership.png';
import grade from './img/exam.png';
import location from './img/location.png';
//
import {getGradeItems} from '../../components/CollegeHandler/CollegePanel.jsx';
//
import {CollegeTypeFilterParams, Ownership} from '../../services/DataCarrier.js';

const CollegePage = () => {

    const [college, setCollege] = useState(currCollegeData.data);

    console.log(college);

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
                                            <p className={style.Info}>{college.collegeLocation.region}</p>
                                            <p>Локация</p>
                                        </div>
                                    </div>
                                </div>

                                <div className={style.AdminBox}>
                                    <div className={style.Item}>
                                        <img className={style.ItemImg} src={collegeType}></img>
                                        <div>
                                            <p className={style.Info}>{Ownership[college.collegeDescription.collegeType]}</p>
                                            <p>Тип учреждения</p>
                                        </div>
                                    </div>
                                    <div className={style.Item}>
                                        <img className={style.ItemImg} src={ownership}></img>
                                        <div>
                                            <p className={style.Info}>{CollegeTypeFilterParams[college.collegeDescription.ownership]}</p>
                                            <p>Форма собственности</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className={style.collegeDescription}>{college.collegeDescription.description}</p>
                        </div>
                        <div className={`${style.Content} ${style.Description}`}></div>
                    </div>
                    <div className={`${style.Content} ${style.CostPanel}`}></div>
                </div>
            </div>
        </div>
    );
}

export default CollegePage;