import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import style from './TestKlimova.module.css';
//
import {QuestionData} from './Data.js';
//
import TestKlimovaQuestion from '../../components/TestKlimovaQuestion/TestKlimovaQuestion.jsx';
//
import TestKlimovaResult from './TestKlimovaResult/TestKlimovaResult.jsx';
import ExceptionState from '../../features/exceptions/ApplicationException.js';


const TestKlimova = () => {

    const [completedQuestions, setCompletedQuestions] = useState(0);

    const [questionState, setQuestionState] = useState(new Array(QuestionData.length).fill(null));
      
    const [showResult, setShowResult] = useState(false);

    const clearData = () => {
        setCompletedQuestions(0);
        setQuestionState(new Array(QuestionData.length).fill(null));
        setShowResult(false);
    }

    
    const handleSubmission = () => {

        if(completedQuestions === QuestionData.length)
            setShowResult(true); 
        else
            ExceptionState.setException(true, "Ошибка. Не все поля заполнены");
    }

    const fillQuestionState = (id, state) => {

        const questionStateArray = questionState;
        questionStateArray[id-1] = state;

        setQuestionState(questionStateArray);

        setCompletedQuestions(QuestionData.length - (questionState.filter(element => element === null).length));
    }

    return(
        <div className={style.MainBox}>

            <p id={style.Certificate}>* Тест на определение типа будущей профессии сделан Г. В. Резапкиной 
            для профориентации школьников на основе аналогичной методики Е. А. Климова и использует его 
            классификацию профессий: природа, техника, знак, искусство, человек.
            </p>

            <div className={style.BarPanel}>
                <button className={style.RetryButton} onClick={() => clearData()}>Очистить</button>
                <div className={style.BarBox}>
                    <ProgressBar completed={completedQuestions} isLabelVisible={false} width='100%' height="100%" maxCompleted={QuestionData.length} bgColor={'#eaeaea'} borderRadius={'0px'} baseBgColor={'transparent'} />
                    <p id={style.BarDescription}>Вопросов {completedQuestions} из {QuestionData.length}</p>
                </div>
            </div>

            <div className={style.ContentBox}>
                <div className={style.Content}>
                    {Array.isArray(QuestionData) && QuestionData.map((item, index) => 
                        <TestKlimovaQuestion data={item} completedQuestionCount={completedQuestions} action={fillQuestionState}/>
                    )
                    }
                </div>

                <div className={style.SubmitBox}>
                    <p>Вы уверены в своем ответе?</p>
                    <button className={style.SubmitButton} onClick={handleSubmission}>Отправить</button>
                </div>

                {completedQuestions === QuestionData.length && showResult  &&
                    <TestKlimovaResult data={questionState} />
                }
            </div>
        </div>
    );
}

export default TestKlimova;