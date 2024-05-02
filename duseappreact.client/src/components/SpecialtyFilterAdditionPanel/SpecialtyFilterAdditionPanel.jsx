
import React, {useState, useEffect} from "react";
import style from './SpecialtyFilterAdditionPanel.module.css';
import AdditionButton from './img/AdditionButton.svg';
import {  getAllSpecialties } from '../../services/Colleges.js';
import CheckboxEmpty from './img/CheckboxEmpty.svg';
import SpecialtyPanel from '../SpecialtyPanel/SpecialtyPanel.jsx';

const SpecialtyFilterAdditionPanel = () => {

    const [specialtyFilterParams, setSpecialtyFilterParams] = useState([]);
    const [specialties, setSpecialties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSepcialties = async () => {
            const data = await getAllSpecialties();
            setLoading(false);
            setSpecialtyFilterParams(data);
        }
        getSepcialties();

    }, []);

    const [dropdownState, setDropdownState] = useState({ open: false });

    const handleDropdownClick = () =>
        setDropdownState({ open: !dropdownState.open });

    const handleClickAddSpecialty = (specialty) =>
        setSpecialties([...new Set([...specialties, specialty])]);

    return (
        <div className={style.MainBox}>
            <div className={style.SpecialtyFilter}>
                <p id={style.specialtyFilterTitle}>Специальности</p>
                <img src={AdditionButton} className={dropdownState.open ? `${style.AdditionButton} ${style.open}` : style.AdditionButton} onClick={handleDropdownClick}/>
            </div>
            {dropdownState.open && (
                <div className={style.DropdownBox}>
                    {loading ? <div className={style.Preloader}><p>Loading...</p></div> : 
                        Array.isArray(specialtyFilterParams) ? 
                        specialtyFilterParams.map((specialtyTitle, index) => 
                            <div className={style.DropdownItem} key={index} onClick={() => handleClickAddSpecialty(specialtyTitle)}>
                                <img src={CheckboxEmpty} className={CheckboxEmpty}></img>
                                <p>{specialtyTitle}</p>
                            </div>
                        ) : null
                    }
                </div>
            )}
            {specialties.length !=0 ? <SpecialtyPanel speсialtyList={specialties}/> : null}
        </div>
    );
}

export default SpecialtyFilterAdditionPanel;

