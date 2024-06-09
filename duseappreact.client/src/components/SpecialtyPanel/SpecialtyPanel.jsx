
import React from 'react';
import style from './SpecialtyPanel.module.css';

const SpecialtyPanel = ({speсialtyList, actionClick}) => {

    console.log(speсialtyList);

    const selectElement = (specialty) => {

        if (actionClick !== null)
            actionClick(specialty);
    }

    return (
        <div className={style.specialtyPanel}>
            {Array.isArray(speсialtyList) ? speсialtyList.map((specialty, index) =>
                specialty!='' ? 
                <div className={style.specialtyItem} key={index} onClick={() => selectElement(specialty)}>
                    <p>{specialty}</p>
                </div>
                : null
            ) : null}
        </div>
    );
}

export default SpecialtyPanel;