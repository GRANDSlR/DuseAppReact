import React, {useState, useEffect} from 'react'
import { observer } from 'mobx-react';

import SelectModule from '../SelectModule/SelectModule.jsx';
import { EducationFormFilterParams} from '../../services/DataCarrier.js';
import ExceptionState from '../../services/ApplicationException.js';


import CrossImg from '../GradePanel/img/cross.png';
import CheckImg from '../GradePanel/img/check.png';

import style from './SpecialtyAdditionPanel.module.css';

const SpecialtyAdditionPanel = observer(({closeEvent, data, additionAction}) => {

    const [title, setTitle] = useState(data !== null ? JSON.parse(data).title : '');
    
    const [cost, setCost] = useState(data !== null ? JSON.parse(data).cost : '');

    const [freePlaces, setFreePlaces] = useState(data !== null ? JSON.parse(data).freePlaces : '');
    
    const [passingScore, setPassingScore] = useState(data !== null ? JSON.parse(data).passingScore : '');

    const [description, setDescription] = useState(data !== null ? JSON.parse(data).description : '');

    const [educationForm, setEducationForm] = useState(data !== null ? JSON.parse(data).educationForm : EducationFormFilterParams[0]);


    const getData = () => {

        if(verifyFields())
        {
            additionAction(JSON.stringify({
                title: title,
                cost: cost,
                freePlaces: freePlaces,
                passingScore: passingScore,
                description: description,
                educationForm: educationForm
            }));
            closeEvent(false);
        }
    }

    const verifyFields = () => {

        if(title === '')
        {
            ExceptionState.setException(true, "Ошибка. Заполните поле наименования");
            return false;
        }

        if(parseInt(cost) < 0 || cost === '')
        {
            ExceptionState.setException(true, "Ошибка. Цена обучения не валидна");
            return false;
        }

        if(parseInt(freePlaces) < 0 || freePlaces === '')
        {
            ExceptionState.setException(true, "Ошибка. Поле 'Количесто мест' не валидно");
            return false;
        }

        if(parseInt(passingScore) < 0 || parseInt(passingScore) > 10 || cost === '')
        {
            ExceptionState.setException(true, "Ошибка. Проходной балл не валиден");
            return false;
        }

        if(description === '')
        {
            ExceptionState.setException(true, "Ошибка. Заполните поле 'Ключевые слова'");
            return false;
        }

        return true;

    }

    return (
        <div className={style.SpecialtyAdditionBox}>
            <div className={style.Content}>
                <div className={style.HorizPanel}>
                    <div className={style.Item}>
                        <p className={style.DescTitle}>Наименование</p>
                        <div className={style.InputBox}>
                            <input type='text' value={title} onChange={(event) => setTitle(event.target.value)} placeholder='Название специальности'></input>
                        </div>
                    </div>
                    <div className={style.Item}>
                        <p className={style.DescTitle}>Форма обучения</p>
                        <SelectModule defaultValue={educationForm} data={EducationFormFilterParams} actionFunc={setEducationForm} />
                    </div>
                </div>

                <div className={style.HorizPanel}>
                    <div className={style.Item}>
                        <p className={style.DescTitle}>Цена за год</p>
                        <div className={style.InputBox}>
                            <input type='number' onChange={(event) => setCost(event.target.value)} value={cost} placeholder='Цена'></input>
                        </div>
                    </div>
                    <div className={style.Item}>
                        <p className={style.DescTitle}>Количество мест</p>
                        <div className={style.InputBox}>
                            <input type='number' onChange={(event) => setFreePlaces(event.target.value)} value={freePlaces} placeholder='Места'></input>
                        </div>
                    </div>
                    <div className={style.Item}>
                        <p className={style.DescTitle}>Проходной балл</p>
                        <div className={style.InputBox}>
                            <input type='number' onChange={(event) => setPassingScore(event.target.value)} value={passingScore} placeholder='Балл'></input>
                        </div>
                    </div>
                </div>

                <p className={style.DescTitle}>Ключевые слова</p>
                <div className={`${style.InputBox} ${style.DescPanel}`}>
                    <textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder='Добавьте ключевые слова, описывающие эту специальность  '></textarea>
                </div>
            </div>

            <div className={style.ButtonBox}>
                    <button type='button' className={style.Button} onClick={() => closeEvent(false)}>
                        <img src={CrossImg}></img>
                    </button> 
                    <button type='button' className={`${style.Button} ${style.Submit}`} onClick={() => getData()}>
                        <img src={CheckImg}></img>
                    </button> 
            </div>

        </div>
    );
});

export default SpecialtyAdditionPanel;