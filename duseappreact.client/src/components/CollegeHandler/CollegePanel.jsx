import React from 'react'
import style from './CollegePanel.module.css';
import SpecialtyPanel from '../SpecialtyPanel/SpecialtyPanel.jsx';
import websitePin from './img/AdmitistrationPanel/websitePin.svg';
import locationPin from './img/AdmitistrationPanel/locationPin.svg';
import heartFull from './img/SaveButton/heartFull.svg';
import heartEmpty from './img/SaveButton/heartFull.svg';

const SpecialtyListContext = React.createContext();

export default SpecialtyListContext;

export const Colleges = ({collegeObjects}) => {

    return (
        <div className={style.Cards}>
            {collegeObjects.map((college, index) => 
                <div className={style.CollegeCard} key={index}>

                    <p id={style.collegeTitle}>{college.collegeHeader.title}</p>
                    <p id={style.collegeLocationHeader}>{college.collegeLocation.region}</p>

                    <SpecialtyListContext.Provider value={college.speсialtyList}>
                        <SpecialtyPanel/>
                    </SpecialtyListContext.Provider>
                    
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
            )}
        </div>
    );
}