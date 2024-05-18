
import React, { useState, useEffect } from 'react';
import style from './AuthPanel.module.css';
import duseApp from './img/DuseApp.svg';
import {register, login} from '../../services/Users.js'

const AuthHeader = (closeEvent) => {

    const [isRegister, setAuth] = useState(true);

    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const changeAuth = (state) => {
        setAuth(state);
    };

    const submitAuth = async () => {
        
        const response = isRegister ? await register(
            {
                "userName": userName,
                "email": userEmail,
                "password": userPassword
            })
            : await login(
            {
                "email": userEmail,
                "password": userPassword
            })

        if(response.ok)
            closeEvent.closeEvent()
        else
            console.log(response.status)
    };

    const resetInputParams = () =>{
        setUserName('');
        setUserEmail('');
        setUserPassword('');
    }

    useEffect(() => {
        resetInputParams();
    }, [isRegister])

    return (
        <div className={style.ModalBox}>
            <div className={style.DuseAppLogoBox}>
                <img src={duseApp}/>
            </div>
            <div className={style.Menu}>
                <p className={isRegister ? `${style.MenuLink} ${style.active}` : style.MenuLink} onClick={() => changeAuth(true)}>Регистрация</p>
                <p className={!isRegister ? `${style.MenuLink} ${style.active}` : style.MenuLink} onClick={() => changeAuth(false)}>Войти</p>
            </div>
            {isRegister ?  (
                <div className={style.InputBox}>
                    <div className={style.Input}>
                        <input type='text' placeholder='Имя пользователя' value={userName} onLoad={(e) => setUserName('')} onChange={(e) => setUserName(e.target.value)}></input>
                    </div>
                    <div className={style.Input}>
                        <input type='text' placeholder='E-mail' value={userEmail}  onChange={(e) => setUserEmail(e.target.value)}></input>
                    </div>
                    <div className={style.Input}>
                        <input type='password' placeholder='Пароль' value={userPassword} onChange={(e) => setUserPassword(e.target.value)}></input>
                    </div>
                </div>
            ) : (
                <div className={style.InputBox}>
                    <div className={style.Input}>
                        <input type='text' placeholder='E-mail' value={userEmail} onChange={(e) => setUserEmail(e.target.value)}></input>
                    </div>
                    <div className={style.Input}>
                        <input type='password' placeholder='Пароль' value={userPassword} onChange={(e) => setUserPassword(e.target.value)}></input>
                    </div>
                </div>
            )}
            <div className={style.EntryConditionBox}>
                <p>
                    Нажимая “Войти” вы принимаете положения, которые содержат
                    <a href="#"> Политику конфиденциальности </a>
                    DuseApp
                </p>
            </div>
            <button type='submit' className={style.AccessButton} onClick={submitAuth}>Войти</button>
            {isRegister ? (
                <div className={style.ChangeAuthButton} onClick={() => changeAuth(false)}>
                    <p>Уже есть учетная запись? Войти</p>
                </div>
            ) : (
                <div className={style.ChangeAuthButton} onClick={() => changeAuth(true)}>
                    <p>Впервые в DuseApp? Создать учетную запись</p>
                </div>
            )}
        </div>
    );
}

export default AuthHeader;