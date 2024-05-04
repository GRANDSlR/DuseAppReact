
import React, {useState} from "react";
import style from './CheckBoxPanel.module.css';
import CheckboxEmpty from './img/CheckboxEmpty.svg';
import AppliedCheckbox from './img/AppliedCheckbox.svg';



export default function CheckBoxPanel ({sessionStorageName, data}){

    const [filterParams, setFilterParams] = useState(
        sessionStorage.getItem(sessionStorageName) != null ? 
        sessionStorage.getItem(sessionStorageName).split(',') : []);

    const handleClickAddSpecialty = (addedItem) => {
        if (filterParams.includes(addedItem)) {
            setFilterParams(filterParams.filter(item => item !== addedItem)); 
            sessionStorage.setItem(sessionStorageName, filterParams.filter(item => item !== addedItem));
        } else {
            setFilterParams([...new Set([...filterParams, addedItem])]);
            sessionStorage.setItem(sessionStorageName, [...new Set([...filterParams, addedItem])]);
        }
    }

    return (
        <div className={style.MainBox}>
            {Array.isArray(data) ? data.map((item, index) =>
            <div className={style.PanelItem} onClick={() => handleClickAddSpecialty(item)} key={index}>
                <img src={filterParams.includes(item) ? AppliedCheckbox : CheckboxEmpty}></img>
                <p>{item}</p>
            </div>
            ) : null}
        </div>
    );
}