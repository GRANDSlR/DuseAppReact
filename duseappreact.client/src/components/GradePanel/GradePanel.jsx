
import React, {useState} from 'react'
import style from './GradePanel.module.css';
//
import FullStar from '../CollegeHandler/img/FullStar.png';
import EmptyStar from '../CollegeHandler/img/EmptyStar.png';
//
import CrossImg from './img/cross.png';
import CheckImg from './img/check.png';
//
import {updateGrade} from '../../entities/CollegeFetches.js';

const GradePanel = ({closeEvent, collegeId}) => {

    const [currGradeValue, setCurrGradeValue] = useState('0');

    const updateCollegeGrade = () => {

        updateGrade(collegeId, {grade: parseInt(currGradeValue)})
        .then(updatedCollegeId => {
            console.log('College updated successfully:', updatedCollegeId);

            closeEvent(null);
        })
        .catch(error => {
            console.error('Failed to update college:', error);
        });
    }

    return (
        <div className={style.MainBox}>
            <div className={style.ContentBox} >
                <p>Оцените этот колледж</p>
                <div className={style.StarPanel}>
                    <img src={parseInt(currGradeValue) >= 1 ? FullStar : EmptyStar} onClick={() => setCurrGradeValue('1')}></img>
                    <img src={parseInt(currGradeValue) >= 2 ? FullStar : EmptyStar} onClick={() => setCurrGradeValue('2')}></img>
                    <img src={parseInt(currGradeValue) >= 3 ? FullStar : EmptyStar} onClick={() => setCurrGradeValue('3')}></img>
                    <img src={parseInt(currGradeValue) >= 4 ? FullStar : EmptyStar} onClick={() => setCurrGradeValue('4')}></img>
                    <img src={parseInt(currGradeValue) === 5 ? FullStar : EmptyStar} onClick={() => setCurrGradeValue('5')}></img>
                </div>
            </div>
            <div className={style.ButtonBox}>
                    <button type='button' className={`${style.Button} ${style.Submit}`} onClick={() => updateCollegeGrade()}>
                        <img src={CheckImg}></img>
                    </button> 
                    <button type='button' className={style.Button} onClick={() => closeEvent(null)}>
                        <img src={CrossImg}></img>
                    </button> 
                    
            </div>
            <div className={style.Arrow}></div>
        </div>
    );
}

export default GradePanel;