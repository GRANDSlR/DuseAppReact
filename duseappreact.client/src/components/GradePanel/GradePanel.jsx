
import React, {useState} from 'react'
import style from './GradePanel.module.css';
import FullStar from '../CollegeHandler/img/FullStar.png';
import EmptyStar from '../CollegeHandler/img/EmptyStar.png';

const GradePanel = (closeEvent) => {

    const [currGradeValue, setCurrGradeValue] = useState('0');

    return (
        <div>
            <div className={style.ContentBox} >
                <p>Оцените этот колледж</p>
                <div className={style.StarPanel}>
                    <img src={parseInt(currGradeValue) >= 1 ? FullStar : EmptyStar} onClick={() => setCurrGradeValue('1')}></img>
                    <img src={parseInt(currGradeValue) >= 2 ? FullStar : EmptyStar} onClick={() => setCurrGradeValue('2')}></img>
                    <img src={parseInt(currGradeValue) >= 3 ? FullStar : EmptyStar} onClick={() => setCurrGradeValue('3')}></img>
                    <img src={parseInt(currGradeValue) >= 4 ? FullStar : EmptyStar} onClick={() => setCurrGradeValue('4')}></img>
                    <img src={parseInt(currGradeValue) === 5 ? FullStar : EmptyStar} onClick={() => setCurrGradeValue('5')}></img>
                </div>
                <button type='submit' className={style.SubmitButton}>Отправить</button> 
            </div>
            <div className={style.Arrow}></div>
        </div>
    );
}

export default GradePanel;