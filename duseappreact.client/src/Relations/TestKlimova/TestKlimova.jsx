import React, { useEffect, useState } from "react";

import ProgressBar from "@ramonak/react-progress-bar";
import style from './TestKlimova.module.css';
//
import {QuestionRespoce, QuestionData} from './Data.js';

const TestKlimova = () => {

    const [completedQuestions, setCompletedQuestions] = useState(0);

    const [questionState, setQuestionState] = useState(new Array(QuestionData.length).fill(null));

    const clearData = () => {
        setCompletedQuestions(0);
        setQuestionState(new Array(QuestionData.length).fill(null));
    }

    return(
        <div className={style.MainBox}>
            <div className={style.BarPanel}>
                <button className={style.RetryButton} onClick={() => clearData()}>Очистить</button>
                <div className={style.BarBox}>
                    <ProgressBar completed={completedQuestions} isLabelVisible={false} width='100%' height="100%" maxCompleted={QuestionData.length} bgColor={'#eaeaea'} borderRadius={'0px'} baseBgColor={'transparent'} />
                    <p id={style.BarDescription}>Вопросов {completedQuestions} из {QuestionData.length}</p>
                </div>
            </div>

            <div className={style.Content}>

            </div>
        </div>
    );
}

export default TestKlimova;