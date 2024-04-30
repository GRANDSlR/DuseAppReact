
import React, { useState } from "react";
import style from "./SortFallingList.module.css";
import Circumflexus from "../FallingList/img/CircumflexusInvert.svg";

const data = [
    'Название, от А до Я',
    'Название, от Я до А',
    'Высокий рейтинг',
    'Низкий рейтинг'
]

const SortFallingList = () => {

    const [dropdownState, setDropdownState] = useState({ open: false });
    const [sortValue, setSortValue] = useState(data[0]);

    const handleClickOpen = () =>
    setDropdownState({ open: !dropdownState.open });

    const handleClickValue = (value) =>
    setSortValue(value);

    return (
        <div className={style.SelectBox} onClick={handleClickOpen}>
            <div className={style.ParentBox}   >
                <span className={style.currentSelectionValue}>{sortValue}</span>
                <img src={Circumflexus} className={style.Circumflexus}/>
            </div>
            {dropdownState.open && (
            <ul className={style.DropdownMenu}>
                {
                Array.isArray(data) ? 
                data.map((val, index) => {
                    return (
                    <li key={index}>
                        <p className={style.selectionValue} onClick={() => {handleClickValue(val)}}>{val}</p>
                    </li>
                    );
                })
                : null}
            </ul> 
            )}
        </div>
    );

}

export default SortFallingList;