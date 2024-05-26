
import React, { useState, useEffect } from 'react';
import style from './UserProfile.module.css';
import CrossImg from './img/Cross.png';
import CheckImg from './img/Check.png';
import UserIcon from './img/DefaultUserIcon.svg';
import {updateUser, deleteUser} from '../../services/Users.js';
import {deleteCookies} from '../../services/CookieService.js';


const UserProfile = ({userData, closeEvent}) => {

    const [userName, setUserName] = useState(userData.name);

    const [userEmail, setUserEmail] = useState(userData.email);

    const updateUserEvent = () => {

        updateUser(userData.id, {UserName: userName, Email: userEmail})
        .then(updatedUserId => {
            console.log('User updated successfully:', updatedUserId);
            sessionStorage.setItem('userModel', JSON.stringify(
            {
                'id': userData.id,
                'name': userName,
                'email': userEmail,
                'passwordHash': userData.passwordHash,
                'role': userData.role
            }));
            closeEvent(false);
        })
        .catch(error => {
            console.error('Failed to update user:', error);
        });

    }

    const logOut = () => {
        sessionStorage.setItem('userModel', null);
        deleteCookies('space-cookies');
        closeEvent(false);
    }

    const deleteUserEvent = () => {

        deleteUser(userData.id)
        .then(deletedUserId => {
            console.log('User deleted successfully:', deletedUserId);
            sessionStorage.setItem('userModel', null);
            deleteCookies('space-cookies');
            closeEvent(false);
        })
        .catch(error => {
            console.error('Failed to update user:', error);
        });

    }

    return (
        <div className={style.MainBox}>
            <div className={style.MainContentBox}>
                <div className={style.AdminBox}>
                    <div className={style.UserImgbox}>
                        <img src={UserIcon}></img>
                    </div>
                    <button type='submit' className={style.Button}>Сменить фото</button>
                    <button type='submit' className={style.Button} onClick={logOut }>Выйти из аккаунта</button>
                    <button type='submit' className={`${style.Button} ${style.Important}`} onClick={deleteUserEvent}>Удалить аккаунт</button>
                </div>
                <div className={style.InfoBox}>
                    <p className={style.HeaderTitle}>Мой профиль</p>

                    <div className={style.InputBox}>
                        <p className={style.InputTitle}>Имя</p>
                        <input type='text' value={userName} onChange={(event) => setUserName(event.target.value)}></input>
                    </div>

                    <div className={style.InputBox}>
                        <p className={style.InputTitle}>E-mail</p>
                        <input type='text' value={userEmail} onChange={(event) => setUserEmail(event.target.value)}></input>
                    </div>

                    <div className={style.AuthBox}>
                        <p className={style.Title}>Аутентификация</p>

                        <div className={style.AuthItemBox}>
                            <p>Идентификатор</p>
                            <p>{userData.email}</p>
                        </div>

                        <div className={style.AuthItemBox}>
                            <p>Использование ваших данных</p>
                            <p id={style.AuthDataUrl}>https://userAuthentification.com</p>
                        </div>
                    </div>

                </div>
            </div>
            <div className={style.WindowButtonBox}>
                <button type='submit' className={`${style.Button} ${style.Exit}`} onClick={() => closeEvent(false)}>
                    <img src={CrossImg}></img>
                </button>
                <button type='submit' className={`${style.Button} ${style.ChangeUserData}`} onClick={updateUserEvent}>
                    <img src={CheckImg}></img>
                </button>
            </div>
        </div>
    );
}

export default UserProfile;