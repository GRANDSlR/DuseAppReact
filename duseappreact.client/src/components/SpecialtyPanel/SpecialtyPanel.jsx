
import React, { useContext } from 'react';
import style from './SpecialtyPanel.module.css';
import SpecialtyListContext from '../CollegeHandler/CollegePanel.jsx';

export default function SpecialtyPanel () {

    const specialtyList = useContext(SpecialtyListContext);

    return (
        <div className={style.specialtyPanel}>
            {specialtyList.map((specialty, index) =>
                <div className={style.specialtyItem} key={index}>
                    <p>{specialty.title}</p>
                </div>
            )}
        </div>
    );
}