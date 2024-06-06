import React, {useState, useEffect} from 'react'
import style from './CollegeAdditionForm.module.css';
//
import CrossImg from '../CommentHandler/img/Cross.png';
import CheckImg from '../CommentHandler/img/Check.png';
//
import SelectModule from '../SelectModule/SelectModule.jsx';
//
import {CollegeTypeFilterParams, EducationFormFilterParams, Ownership} from '../../services/DataCarrier.js';

const CollegeAdditionForm = ({closeEvent}) => {

    const [collegeType, setCollegeType] = useState(CollegeTypeFilterParams[0]);

    const [ownershipValue, setOwnershipValue] = useState(Ownership[0]);

    const [specialtyAddition, setSpecialtyAddition] = useState(false);

    // specialty
    const [educationForm, setEducationForm] = useState(EducationFormFilterParams[0]);


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
                            <SelectModule data={CollegeTypeFilterParams} actionFunc={setCollegeType} />
                        </div>
                        <div className={style.Item}>
                            <p className={style.DescTitle}>Форма собственности</p>
                            <SelectModule data={Ownership} actionFunc={setOwnershipValue} />
                        </div>
                    </div>

                    <div className={style.Row}>
                        <p className={style.DescTitle}>Ссылка на первоисточник</p>
                        <div className={style.InputBox}>
                            <input type='text' placeholder='URL-адрес'></input>
                        </div>
                    </div>

                    {/* <div className={style.Row}> */}
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
                    {/* </div> */}

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

                    {specialtyAddition && 
                        <div className={style.SpecialtyAdditionBox}>

                            <div className={style.HorizPanel}>
                                <div className={style.Item}>
                                    <p className={style.DescTitle}>Наименование</p>
                                    <div className={style.InputBox}>
                                        <input type='text' placeholder='Название специальности'></input>
                                    </div>
                                </div>
                                <div className={style.Item}>
                                    <p className={style.DescTitle}>Форма обучения</p>
                                    <SelectModule data={EducationFormFilterParams} actionFunc={setEducationForm} />
                                </div>
                            </div>

                            <div className={style.HorizPanel}>
                                <div className={style.Item}>
                                    <p className={style.DescTitle}>Цена за год</p>
                                    <div className={style.InputBox}>
                                        <input type='number' placeholder='Цена'></input>
                                    </div>
                                </div>
                                <div className={style.Item}>
                                    <p className={style.DescTitle}>Количество мест</p>
                                    <div className={style.InputBox}>
                                        <input type='number' placeholder='Места'></input>
                                    </div>
                                </div>
                                <div className={style.Item}>
                                    <p className={style.DescTitle}>Проходной балл</p>
                                    <div className={style.InputBox}>
                                        <input type='number' placeholder='Балл'></input>
                                    </div>
                                </div>
                            </div>

                            <p className={style.DescTitle}>Ключевые слова</p>
                            <div className={`${style.InputBox} ${style.DescPanel}`}>
                                <textarea placeholder='Добавьте ключевые слова, описывающие эту специальность  '></textarea>
                            </div>

                        </div>
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