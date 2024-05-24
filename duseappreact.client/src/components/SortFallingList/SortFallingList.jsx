
import React, { useState, useEffect } from "react";
import style from "./SortFallingList.module.css";
import Circumflexus from "../FallingList/img/CircumflexusGrey.svg";
import sortData from './SortHandler.js';


const SortFallingList = (actionFunc) => {

    const [dropdownState, setDropdownState] = useState({ open: false });
    const [sortValue, setSortValue] = useState(sortData[0]);

    useEffect(() => {
        actionFunc.actionFunc(sortValue);
    }, [sortValue]);

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
                Array.isArray(sortData) ? 
                sortData.map((val, index) => {
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