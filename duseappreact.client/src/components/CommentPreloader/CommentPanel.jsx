import React, {useState, useEffect} from 'react';
import style from './CommentPanel.module.css';
//
import defaultUserIcon from './img/DefaultUserIcon.svg';
//
import { observer } from 'mobx-react';
//
//
import {getGradeItems} from '../CollegeHandler/CollegePanel.jsx';
//
import {getUserById} from '../../services/User/UserFetches.js';

const CommentPreloader = observer((comment) => {

    const getUser = async (id) => {

        await getUserById(id)
        .then(user => {
            
            console.log(user);

            return JSON.parse(user);
        })
        .catch(error => {
            ExceptionState.setException(true, "Пользователь не найден. " +`${error}`);
        });
    }

    return (
        <div>
        {comment.comment != null ? 

            <div className={style.MainBox}>
                <div className={style.AdminBox}>
                    <div className={style.UserIcon}><img src={defaultUserIcon}></img></div>
                    <div className={style.UserParams}>
                        <div className={`${style.Item} ${style.UserName}`}>
                            <p>{getUser(JSON.parse(comment).userId).name}</p>
                        </div>
                        <div className={`${style.Item} ${style.UserGrade}`}>
                            {getGradeItems(JSON.parse(comment).grade)}
                        </div>
                    </div>
                </div>
                <div className={`${style.Item} ${style.Comment}`}>
                    <p>{JSON.parse(comment).message}</p>
                </div>
            </div>

            : <div className={style.MainBox}>
                <div className={style.AdminBox}>
                    <div className={style.UserIcon}></div>
                    <div className={style.UserParams}>
                        <div className={`${style.Item} ${style.UserName}`}></div>
                        <div className={`${style.Item} ${style.UserGrade}`}></div>
                    </div>
                </div>
                <div className={`${style.Item} ${style.Comment}`}></div>
                <div className={`${style.Item} ${style.CommentNear}`}></div>
            </div>
        }
        </div>
    );
});

export default CommentPreloader;