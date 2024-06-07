import React, {useState, useEffect} from 'react';
import style from './CommentPanel.module.css';
//
import defaultUserIcon from './img/DefaultUserIcon.svg';
import pencil from './img/pencilNew.png';
import bin from './img/binNew.png';
//
import { observer } from 'mobx-react';
//
import {getGradeItems} from '../CollegeHandler/CollegePanel.jsx';
import ActionCheck from '../ActionCheck/ActionCheck.jsx';
//
import {getUserById} from '../../services/User/UserFetches.js';
import {deleteComment} from '../../services/CommentFetches.js'
import ExceptionState from '../../services/ApplicationException.js';
import PopUpState from '../../services/PopUpState.js';
import UserModel from '../../services/User/UserModel.js';



const CommentPanel = observer(({comment, deleteAction}) => {

    const [user, setUser] = useState(null);

    const [commentToDelete, setCommentToDelete] = useState(false);

    useEffect(() => {

        const getUser = async () => {

            await getUserById(comment.userId)
            .then(user => {
                
                setUser(user);
            })
            .catch(error => {
                ExceptionState.setException(true, "Пользователь не найден. " +`${error}`);
                console.log(error);
            });
        }

        getUser();

    }, [comment.userId])

    const formatDate = (dateTimeString) => {

        let dateTime = new Date(dateTimeString);

        let year = dateTime.getFullYear();
        let month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        let day = dateTime.getDate().toString().padStart(2, '0');
        let hours = dateTime.getHours().toString().padStart(2, '0');
        let minutes = dateTime.getMinutes().toString().padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    const closeEvent = (state) => {
        PopUpState.setPopUpState(state, null);
      }

      const openCommentDeletingWindow = () => {
        PopUpState.setPopUpState(true, <ActionCheck closeEvent={closeEvent} applyEvent={setCommentToDelete} message={'Вы уверены, что хотите удалить комментарий?'}/>);
      }

    useEffect(() => {

        if(commentToDelete)
        {
            const deleteCommentAction = async() => {
                await deleteComment(comment.id)
                .then(commentId => {
                    ExceptionState.setException(true, "Комментарий успешно удален");
                    deleteAction();
                })
                .catch(error => {
                    ExceptionState.setException(true, "Не удалось удалить комментарий. " +`${error}`);
                    console.log(error);
                });
            }

            deleteCommentAction();

            setCommentToDelete(false);
        }

    }, [commentToDelete]);

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
                        {((UserModel.userData !== null && JSON.parse(UserModel.userData).role === 0 ) || (user !== null && UserModel.userData !== null && JSON.parse(UserModel.userData).id === user.id)) && 
                        <div className={style.EditBox}>
                            <img src={pencil}></img>
                            <img src={bin} onClick={() => openCommentDeletingWindow()}></img>
                        </div>
                        }
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