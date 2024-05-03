
import React, {useState, useEffect} from "react";
import style from './SpecialtyFilterAdditionPanel.module.css';
import AdditionButton from './img/AdditionButton.svg';
import {  getAllSpecialties } from '../../services/Colleges.js';
import CheckboxEmpty from './img/CheckboxEmpty.svg';
import AppliedCheckbox from './img/AppliedCheckbox.svg';
import SpecialtyPanel from '../SpecialtyPanel/SpecialtyPanel.jsx';
import SearchIcon from "./img/SearchIconNew.svg"


const SpecialtyFilterAdditionPanel = () => {


    const [specialtyFilterParams, setSpecialtyFilterParams] = useState([]);

    const [specialties, setSpecialties] = useState(
        sessionStorage.getItem('specialtyFilterParams') != null ? 
        sessionStorage.getItem('specialtyFilterParams').split(',') : []);
    const [loading, setLoading] = useState(true);

    const [searchValue, setSearchValue] = useState('');

    const [dropdownState, setDropdownState] = useState({ open: false });


    useEffect(() => {
        const getSepcialties = async () => {
            const data = await getAllSpecialties();
            setLoading(false);
            setSpecialtyFilterParams(data);
        }
        getSepcialties();

    }, []);


    const handleDropdownClick = () =>
        setDropdownState({ open: !dropdownState.open });

    const handleClickAddSpecialty = (specialty) => {
        if (specialties.includes(specialty)) {
            setSpecialties(specialties.filter(item => item !== specialty)); 
            sessionStorage.setItem('specialtyFilterParams', specialties.filter(item => item !== specialty));
        } else {
            setSpecialties([...new Set([...specialties, specialty])]);
            sessionStorage.setItem('specialtyFilterParams', [...new Set([...specialties, specialty])]);
        }
    }

    const textInputHandler = (event) =>
        setSearchValue(event.target.value);

    return (
        <div className={style.MainBox}>
            <div className={style.SpecialtyFilter}>
                <p id={style.specialtyFilterTitle}>Специальности</p>
                <img src={AdditionButton} className={dropdownState.open ? `${style.AdditionButton} ${style.open}` : style.AdditionButton} onClick={handleDropdownClick}/>
            </div>
            {dropdownState.open && (
                <div className={style.DropdownBox}>
                    <div className={style.SearchPanelBox}>
                        <img src={SearchIcon} className={style.SearchIcon} />
                        <input placeholder='поиск по специальностям' className={style.SearchInput} onChange={textInputHandler}></input>
                    </div>
                    <div className={style.DropdownItemBox}>
                    {loading ? <div className={style.Preloader}><p>Loading...</p></div> : 
                        Array.isArray(specialtyFilterParams.filter(element => element.toLowerCase().includes(searchValue))) ? 
                        specialtyFilterParams.filter(element => element.toLowerCase().includes(searchValue)).map((specialtyTitle, index) => 
                            <div className={style.DropdownItem} key={index} onClick={() => handleClickAddSpecialty(specialtyTitle)}>
                                <img src={specialties.includes(specialtyTitle) ? AppliedCheckbox : CheckboxEmpty} className={CheckboxEmpty}></img>
                                <p>{specialtyTitle}</p>
                            </div>
                        ) : <div className={style.EmptyQuery}><p>Ничего не найдено</p></div>
                    }
                    </div>
                </div>
            )}
            {specialties.length !=0 ? <SpecialtyPanel speсialtyList={specialties}/> : null}
        </div>
    );
}

export default SpecialtyFilterAdditionPanel;

