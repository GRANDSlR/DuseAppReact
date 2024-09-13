
import React, { useState } from 'react';

import style from './SpecialtyPanel.module.css';

const SpecialtyPanel = ({ speсialtyList, actionClick }) => {

    const [currSpecialty, setCurrSpecialty] = useState(speсialtyList[0]);

    const selectElement = (specialty) => {

        if (actionClick !== null) {
            setCurrSpecialty(specialty);
            actionClick(specialty);
        }
    }

    return (
        <div className={style.specialtyPanel}>
            {Array.isArray(speсialtyList) ? speсialtyList.map((specialty, index) =>
                specialty !== '' ? (
                    actionClick !== null ? (
                        <div className={currSpecialty === specialty ? style.specialtyItem : `${style.specialtyItem} ${style.disabled}`} key={index} onClick={() => selectElement(specialty)}>
                            <p>{specialty}</p>
                        </div>
                    ) : (
                        <div className={style.specialtyItem} key={index} onClick={() => selectElement(specialty)}>
                            <p>{specialty}</p>
                        </div>
                    )
                ) : null
            ) : null}
        </div>
    );

}

export default SpecialtyPanel;