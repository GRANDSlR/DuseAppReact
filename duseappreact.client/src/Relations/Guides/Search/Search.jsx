import style from '../Guides.module.css';
import rerIcon from '../img/RegIcon.png';
import regPanel from '../img/RegPanel.png';
import EnterPanel from '../img/EnterPanel.png';
import collegeMenu from '../img/collegeMenu.png';
import serchBox from '../img/serchBox.png';
import filterPanel from '../img/filterPanel.png';


const SearchGuide = () => {

    return(
        <div className={style.MainBox}>
            <p>Добро пожаловать! В этом руководстве мы расскажем вам, как осуществлять поиск и фильтрацию данных в нашем приложении.</p>
            <ol className={style.Element}>
                <li>
                    <p className={style.Header}>Поиск</p>

                    <p>Для поиска учреждения по названию необходимо выполнить следующие шаги:</p>

                    <ul>
                        <li>Открыть веб-приложение</li>

                        <li>Перейти во вкладку "Колледжи"
                        </li>
                        <li className={style.ImgItem}>
                            <img src={collegeMenu}/>
                        </li>

                        <li>В появившемся окне вы обнаружите строку поиска.</li>
                        <li className={style.ImgItem}>
                            <img src={serchBox}/>
                        </li>

                        <li>Для осуществления поиска введите необходимый текст в данное поле и дождитель обновления данных.</li>

                    </ul>
                </li>

                <li>
                    <p className={style.Header}>Фильтрация</p>

                    <p>Для фильтрации осуществления данных необходимо выполнить следующие шаги:</p>

                    <ul>
                        <li>Открыть веб-приложение</li>

                        <li>Перейти во вкладку "Колледжи"
                        </li>
                        <li className={style.ImgItem}>
                            <img src={collegeMenu}/>
                        </li>

                        <li>В левой части экрана вы обнаружите панель фильтрационнных параметров.</li>
                        <li className={style.ImgItem}>
                            <img src={filterPanel}/>
                        </li>

                        <li>Изменяя данные параметры вы сможете отфильтровать данные по вашему усмотрению.</li>

                    </ul>
                </li>

            </ol>
        </div>
    );
}

export default SearchGuide;