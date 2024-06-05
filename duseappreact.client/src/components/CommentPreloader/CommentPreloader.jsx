// import React, {useState, useEffect} from 'react';
import style from './CommentPreloader.module.css';

const CommentPreloader = () => {

    return (
       <div className={style.MainBox}>
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
    );
}

export default CommentPreloader;