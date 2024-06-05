import React, {useState, useEffect} from 'react';
import style from './CommentPanel.module.css';
//
import defaultUserIcon from './img/DefaultUserIcon.svg';
//
import { observer } from 'mobx-react';
//
import {getGradeItems} from '../CollegeHandler/CollegePanel.jsx';
//
import {getUserById} from '../../services/User/UserFetches.js';
import ExceptionState from '../../services/ApplicationException.js';


const CommentPanel = observer(({comment}) => {

    const [user, setUser] = useState(null);

    useEffect(() => {

        const getUser = async () => {

            await getUserById(comment.userId)
            .then(user => {
                
                setUser(user);
            })
            .catch(error => {
                ExceptionState.setException(true, "Пользователь не найден. " +`${error}`);
            });
        }

        getUser();

    }, [])

    const formatDate = (dateTimeString) => {

        let dateTime = new Date(dateTimeString);

        let year = dateTime.getFullYear();
        let month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        let day = dateTime.getDate().toString().padStart(2, '0');
        let hours = dateTime.getHours().toString().padStart(2, '0');
        let minutes = dateTime.getMinutes().toString().padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    return (
        <div>
        {comment != null && (

            <div className={style.MainBox}>
                <div className={style.AdminBox}>
                    <div className={style.BoxUnderData}>
                        <div className={style.UserIcon}><img src={defaultUserIcon}></img></div>
                        <div className={style.UserInfo}>
                            <p className={style.UserName}>{user !== null && user.name}</p>
                            <div className={style.UserGrade}>
                                {getGradeItems(comment.grade)}
                            </div>
                        </div>
                    </div>
                    <div className={style.DateOfCreationBox}>
                        <p>{formatDate(comment.dateOfCreation)}</p>
                    </div>
                </div>
                <div className={style.Comment}>
                    <p>{comment.message}</p>
                </div>
            </div>
        )}
        </div>
    );
});

export default CommentPanel;