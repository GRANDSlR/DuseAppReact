
import React, { useState, useEffect } from 'react';
import style from './specialtyBox.module.css';

import SpecialtyPanels from '../../../components/SpecialtyPanel/SpecialtyPanel.jsx'

import {EducationFormFilterParams} from '../../../services/DataCarrier.js';


const specialtyBox = ({ college }) => {

    const [currSpecialty, setCurrSpecialty] = useState(college.specialtyList[0]);

    const setSpecialty = (specialty) => {
        setCurrSpecialty(college.specialtyList.filter((item) => item.title === specialty)[0]);
    }

    return (
        <div className={style.wrapper}>
            <div className={style.chips}>
                <SpecialtyPanels actionClick={setSpecialty} speсialtyList={college.specialtyList.map((item) => item.title)} />
            </div>
            <div className={style.descriptionBox}>
                <div className={style.descriptionItem}>
                    <span className={style.title}>Наименование специальности</span><span>{currSpecialty.title}</span>
                </div>
                <div className={style.descriptionItem}>
                    <span className={style.title}>Форма собственности</span><span>{EducationFormFilterParams[currSpecialty.educationForm]}</span>
                </div>
                <div className={style.descriptionItem}>
                    <span className={style.title}>Стоимость обучения (год)</span><span>{currSpecialty.cost}</span>
                </div>
                <div className={style.descriptionItem}>
                    <span className={style.title}>Балл</span><span>{currSpecialty.passingScore}</span>
                </div>
                <div className={style.descriptionItem}>
                    <span className={style.title}>Количество мест</span><span>{currSpecialty.freePlaces}</span>
                </div>
            </div>
        </div>
    );
}

export default specialtyBox;