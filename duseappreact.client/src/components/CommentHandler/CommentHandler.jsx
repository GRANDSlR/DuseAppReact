import React, {useState, useEffect} from 'react';
import style from './CommentHandler.module.css';
import { observer } from 'mobx-react';
//
import defaultUserIcon from './img/DefaultUserIcon.svg';
//
import UserModel from '../../services/User/UserModel.js';
import ExceptionState from '../../services/ApplicationException.js';
//
import FullStar from '../CollegeHandler/img/FullStar.png';
import EmptyStar from '../CollegeHandler/img/EmptyStar.png';
import CrossImg from './img/Cross.png';
import CheckImg from './img/Check.png';
//
import {updateGrade} from '../../services/Colleges.js';
import {addComment} from '../../services/CommentFetches.js';

const CommentHandler = observer(({closeEvent, collegeId, updateEvent}) => {

    const [currGradeValue, setCurrGradeValue] = useState('0');

    const [commentText, SetCommentText] = useState(null);

    const updateCollegeGrade = async() => {

        await updateGrade(collegeId, {grade: parseInt(currGradeValue)})
        .then(updatedCollegeId => {

            console.log('Grade updated successfully:', updatedCollegeId);

        })
        .catch(error => {
            ExceptionState.setException(true, "Невозможно установить отметку. " +`${error}`);
            console.error('Failed to update college:', error);
        });
    }

    const sendData = async() => {

        let currentDate = new Date();
        currentDate.setHours(currentDate.getHours() + 3);

        if (currentDate.getHours() < 3) {
            currentDate.setDate(currentDate.getDate() + 1);
        }
        
        let formattedDate = currentDate.toISOString();

        if(parseInt(currGradeValue) === 0)
        {
            closeEvent(false);
            ExceptionState.setException(true, "Ошибка отправки данных. Заполните поле оценивания");
            return;
        }

        if(commentText === null || commentText === '')
        {
            closeEvent(false);
            ExceptionState.setException(true, "Ошибка отправки данных. Напишите отзыв");
            return;
        }

        await addComment(collegeId, 
            {
                userId: JSON.parse(UserModel.userData).id, 
                message: commentText,
                grade: currGradeValue,
                dateOfCreation: formattedDate
            })
        .then(addedCommentId => {

            console.log("Comment was added successfully" + addedCommentId);

            updateCollegeGrade();

            closeEvent(false);

            updateEvent(addedCommentId);

            ExceptionState.setException(true, "Комментарий опубликован успешно");

        })
        .catch(error => {
            closeEvent(false);
            ExceptionState.setException(true, "Ошибка отправки данных. " +`${error}`);
            console.error('Failed to update college:', error);
        });

    }

    return (
        <div className={style.MainFormBox}>
            <div className={style.ContentBox}>
            <div className={style.ItemBox}>
                <p className={style.HeaderTitle}>Отправитель</p>
                <div className={style.UserInfoBox}>
                    <img src={defaultUserIcon}></img>
                    <div>
                        <p>{JSON.parse(UserModel.userData).name}</p>
                        <p>{JSON.parse(UserModel.userData).email}</p>
                    </div>
                </div>
            </div>
            <div className={style.ItemBox}>
                <p className={style.HeaderTitle}>Оцените учреждение</p>
                <div className={style.StarPanel}>
                    <img src={parseInt(currGradeValue) >= 1 ? FullStar : EmptyStar} onClick={() => setCurrGradeValue('1')}></img>
                    <img src={parseInt(currGradeValue) >= 2 ? FullStar : EmptyStar} onClick={() => setCurrGradeValue('2')}></img>
                    <img src={parseInt(currGradeValue) >= 3 ? FullStar : EmptyStar} onClick={() => setCurrGradeValue('3')}></img>
                    <img src={parseInt(currGradeValue) >= 4 ? FullStar : EmptyStar} onClick={() => setCurrGradeValue('4')}></img>
                    <img src={parseInt(currGradeValue) === 5 ? FullStar : EmptyStar} onClick={() => setCurrGradeValue('5')}></img>
                </div>
            </div>
            <div className={style.ItemBox}>
                <p className={style.HeaderTitle}>Напишите ваш отзыв</p>
                <div className={style.MultipleInputBox}>
                    <textarea onChange={(event) => SetCommentText(event.target.value)}></textarea>
                </div>
            </div>
            </div>
            <div className={style.WindowButtonBox}>
                <button type='button' className={`${style.Button} ${style.Exit}`} onClick={() => closeEvent(false)}>
                    <img src={CrossImg}></img>
                </button>
                <button type='button' className={`${style.Button} ${style.ChangeUserData}`} onClick={sendData}>
                    <img src={CheckImg}></img>
                </button>
            </div>
        </div>
    );
});

export default CommentHandler;