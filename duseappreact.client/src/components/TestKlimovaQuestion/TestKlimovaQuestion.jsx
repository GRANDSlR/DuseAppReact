import React, { useEffect, useState } from "react";
import checkRed from './img/checkRed.png';
import checkBlue from './img/checkBlue.png';

import style from './TestKlimovaQuestion.module.css';

const TestKlimovaQuestion = ({data, action, completedQuestionCount}) => {

    const [activeState, setActiveState] = useState(null); //default: null

    // useEffect(()=>{
    //     action(data.id, 1)
    // }, [])

    useEffect(() => {

        if(completedQuestionCount === 0)
            setActiveState(null);
        
    }, [completedQuestionCount])

    return (
        <div className={style.MainBox}>
            <p className={style.Title}>{data.title}</p>
            <div className={style.ButtonBox}>
                <button className={`${style.Button} ${style.Approve}`} onClick={() => {action(data.id, 1); setActiveState(1);}}>{activeState === 1 ? <img src={checkBlue}></img> : 'Да'}</button>
                <button className={`${style.Button} ${style.Cansel}`} onClick={() => {action(data.id, 0); setActiveState(0);}}>{activeState === 0 ? <img src={checkRed}></img> : 'Нет'}</button>
            </div>
        </div>
    );
}

export default TestKlimovaQuestion;