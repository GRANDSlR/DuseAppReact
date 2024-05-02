
import React from 'react';
import style from './SpecialtyPanel.module.css';

export default function SpecialtyPanel (speсialtyList) {

    return (
        <div className={style.specialtyPanel}>
            {Array.isArray(speсialtyList.speсialtyList) ? speсialtyList.speсialtyList.map((specialty, index) =>
                <div className={style.specialtyItem} key={index}>
                    <p>{specialty}</p>
                </div>
            ) : null}
        </div>
    );
}