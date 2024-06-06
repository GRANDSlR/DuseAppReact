import React, {useState, useEffect} from 'react'
import style from './CollegeAdditionForm.module.css';
//
import CrossImg from '../CommentHandler/img/Cross.png';
import CheckImg from '../CommentHandler/img/Check.png';
//
import SelectModule from '../SelectModule/SelectModule.jsx';
import SpecialtyAdditionPanel from '../SpecialtyAdditionPanel/SpecialtyAdditionPanel.jsx';
import SpecialtyPanel from '../SpecialtyPanel/SpecialtyPanel.jsx';
//
import {CollegeTypeFilterParams, EducationFormFilterParams, Ownership} from '../../services/DataCarrier.js';

const CollegeAdditionForm = ({closeEvent}) => {

    const [collegeType, setCollegeType] = useState(CollegeTypeFilterParams[0]);

    const [ownershipValue, setOwnershipValue] = useState(Ownership[0]);

    const [specialtyAddition, setSpecialtyAddition] = useState(false);

    const [specialties, setSpecialties] = useState(null);


    const addSpecialty = (data) => {

        if(data !== null)
            if (specialties !== null)
                setSpecialties([...specialties, data]);
            else
                setSpecialties([data]);

    }

    const getSpecialtyNameList = () => {

        if(Array.isArray(specialties))
        {
            return specialties.map(item => JSON.parse(item).title);
        }
    }

    console.log(specialties);


    return (

        <div className={style.MainBox}>
            <div className={style.ContentBox}>
                <div className={style.MainInfo}> 
                    <div className={style.HorizPanel}>
                        <div className={style.Header}>
                            <p className={style.Title}>Описание</p>
                            <p>Основная информация</p>
                        </div>
                    </div>

                    <div className={style.HorizPanel}>
                        <div className={style.Item}>
                            <p className={style.DescTitle}>Наименование</p>
                            <div className={style.InputBox}>
                                <input type='text' placeholder='Название учреждения'></input>
                            </div>
                        </div>
                        <div className={style.Item}>
                            <p className={style.DescTitle}>Фото</p>
                            <div className={style.InputBox}>
                                <input type='text' placeholder='Путь'></input>
                                <p className={style.InputButton}>Открыть</p>
                            </div>
                        </div>
                    </div>

                    <div className={style.HorizPanel}>
                        <div className={style.Item}>
                            <p className={style.DescTitle}>Тип</p>
                            <SelectModule defaultValue={collegeType} data={CollegeTypeFilterParams} actionFunc={setCollegeType} />
                        </div>
                        <div className={style.Item}>
                            <p className={style.DescTitle}>Форма собственности</p>
                            <SelectModule defaultValue={collegeType} data={Ownership} actionFunc={setOwnershipValue} />
                        </div>
                    </div>

                    <div className={style.Row}>
                        <p className={style.DescTitle}>Ссылка на первоисточник</p>
                        <div className={style.InputBox}>
                            <input type='text' placeholder='URL-адрес'></input>
                        </div>
                    </div>

                    <p className={style.DescTitle}>Координаты</p>
                    <div className={style.HorizPanel}>
                        <div className={style.Item}>
                            <div className={style.InputBox}>
                                <input type='number' placeholder='Широта'></input>
                            </div>
                        </div>
                        <div className={style.Item}>
                            <div className={style.InputBox}>
                                <input type='number' placeholder='Долгота'></input>
                            </div>
                        </div>
                    </div>

                    <div className={style.Row}>
                        <p className={style.DescTitle}>Локация</p>
                        <div className={style.InputBox}>
                            <input type='text' placeholder='Название локации'></input>
                        </div>
                    </div>

                    <p className={style.DescTitle}>Описание</p>
                    <div className={`${style.InputBox} ${style.DescPanel}`}>
                        <textarea></textarea>
                    </div>


                </div>

                <div className={style.SpecialtyBox}>

                    <div className={style.HorizPanel}>
                        <div className={style.Header}>
                            <p className={style.Title}>Специальности</p>
                            <p>Управляйте специальностями</p>
                        </div>

                        <button type='button' className={style.SpecialtyAdditionButton} onClick={() => setSpecialtyAddition(true)}>Добавить</button>
                    </div>

                    <SpecialtyPanel speсialtyList={getSpecialtyNameList()} actionClick={null}/>

                    {specialtyAddition && 
                        <SpecialtyAdditionPanel closeEvent={setSpecialtyAddition} data={null} additionAction={addSpecialty}/>
                    }

                </div>
            </div>

            <div className={style.WindowButtonBox}>
                <button type='button' className={`${style.Button} ${style.Exit}`} onClick={() => closeEvent(false)}>
                    <img src={CrossImg}></img>
                </button>
                <button type='button' className={`${style.Button} ${style.ChangeUserData}`}>
                    <img src={CheckImg}></img>
                </button>
            </div>
        </div>
    );
}

export default CollegeAdditionForm;