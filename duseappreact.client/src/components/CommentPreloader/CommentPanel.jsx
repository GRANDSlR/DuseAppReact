import style from './CommentPanel.module.css';
//
import defaultUserIcon from './img/DefaultUserIcon.svg';
//
import { observer } from 'mobx-react';
//
import UserModel from '../../services/User/UserModel.js';
//
import {getGradeItems} from '../CollegeHandler/CollegePanel.jsx';

const CommentPreloader = observer((comment) => {

    return (
        <div>
        {comment.comment != null ? 

            <div className={style.MainBox}>
                <div className={style.AdminBox}>
                    <div className={style.UserIcon}><img src={defaultUserIcon}></img></div>
                    <div className={style.UserParams}>
                        <div className={`${style.Item} ${style.UserName}`}>
                            <p>{JSON.parse(UserModel.userData).name}</p>
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