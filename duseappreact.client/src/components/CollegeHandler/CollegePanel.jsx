import React from 'react'
import style from './CollegePanel.module.css';
import SpecialtyPanel from '../SpecialtyPanel/SpecialtyPanel.jsx';
import websitePin from './img/AdmitistrationPanel/websitePin.svg';
import locationPin from './img/AdmitistrationPanel/locationPin.svg';
import heartFull from './img/SaveButton/heartFull.svg';
import heartEmpty from './img/SaveButton/heartFull.svg';


export const Colleges = ({collegeObjects}) => {

    return (
        <div className={style.Cards}>
            {Array.isArray(collegeObjects) || collegeObjects.length>0 ? collegeObjects.map((college, index) => 
                <div className={style.CollegeCard} key={index}>

                    <p id={style.collegeTitle}>{college.collegeHeader.title}</p>
                    <p id={style.collegeLocationHeader}>{college.collegeLocation.region}</p>

                    <SpecialtyPanel speсialtyList={college.speсialtyList.map((item) => item.title)}/>
                    
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

                    <div className={style.SaveButton}>
                        <img src={heartFull} />
                        <p>Сохранить</p>
                    </div>
                </div>
            ) : <div className={style.ReportMessage}><p>Совпадений не найдено</p></div>}
        </div>
    );
}