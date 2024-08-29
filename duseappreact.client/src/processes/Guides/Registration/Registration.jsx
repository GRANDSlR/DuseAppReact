import style from '../Guides.module.css';
import rerIcon from '../img/RegIcon.png';
import regPanel from '../img/RegPanel.png';
import EnterPanel from '../img/EnterPanel.png'

const RegistrationGuide = () => {

    return(
        <div className={style.MainBox}>
            <p>Добро пожаловать! В этом руководстве мы расскажем вам, как выполнить вход и зарегистрироваться в нашем приложении.</p>
            <ol className={style.Element}>
                <li>
                    <p className={style.Header}>Регистрация</p>

                    <p>Для регистрации нового пользователя необходимо выполнить следующие шаги:</p>

                    <ul>
                        <li>Открыть веб-приложение</li>

                        <li>Нажать на иконку пользователя, которая находится в правом верхнем углу экрана
                        </li>
                        <li className={style.ImgItem}>
                            <img src={rerIcon}/>
                        </li>

                        <li>Будет отображена панель регистрирования нового пользователя.</li>
                        <li>В появившейся панели необходимо заполнить поля имени пользователя, e-mail адреса и пароля.</li>
                        <li className={style.ImgItem}>
                            <img src={regPanel}/>
                        </li>

                        <li>Убедившись, что данные заполнены верно, нажмите кнопку "Войти".</li>

                        <li>Если данные валидны и удволетворяют правилам сообщества, новый пользователь будет создан.</li>

                    </ul>
                </li>

                <li>
                    <p className={style.Header}>Вход</p>

                    <p>Для входа в аккаунт необходимо выполнить следующие шаги:</p>

                    <ul>
                        <li>Открыть веб-приложение</li>

                        <li>Нажать на иконку пользователя, которая находится в правом верхнем углу экрана
                        </li>
                        <li className={style.ImgItem}>
                            <img src={rerIcon}/>
                        </li>

                        <li>Будет отображена панель входа в аккаунт.</li>
                        <li>В появившейся панели необходимо заполнить поля e-mail адреса и пароля.</li>
                        <li className={style.ImgItem}>
                            <img src={EnterPanel}/>
                        </li>

                        <li>Убедившись, что данные заполнены верно, нажмите кнопку "Войти".</li>

                        <li>Если данные валидны и пользователь существует, будет совершен вход в данный аккаунт.</li>

                    </ul>
                </li>

            </ol>
        </div>
    );
}

export default RegistrationGuide;