import style from '../Guides.module.css';
import rerIcon from '../img/RegIcon.png';
import regPanel from '../img/RegPanel.png';
import EnterPanel from '../img/EnterPanel.png';
import collegeMenu from '../img/collegeMenu.png';
import serchBox from '../img/serchBox.png';
import filterPanel from '../img/filterPanel.png';
import searchResults from '../img/searchResults.png';
import saveButton from '../img/saveButton.png';
import favMenu from '../img/favMenu.png';
import compareTable from '../img/compareTable.png';
import specialtyAddition from '../img/specialtyAddition.png';

const FavoriteGuide = () => {

    return(
        <div className={style.MainBox}>
            <p>Добро пожаловать! В этом руководстве мы расскажем вам, как управлять панелью "Избранное" в нашем приложении.</p>
            <ol className={style.Element}>
                <li>
                    <p className={style.Header}>Добавление в "Избранное"</p>

                    <p>Для добавления страницы чреждения образования в "Избранное" необходимо выполнить следующие шаги:</p>

                    <ul>
                        <li>Открыть веб-приложение</li>

                        <li>Перейти во вкладку "Колледжи"
                        </li>
                        <li className={style.ImgItem}>
                            <img src={collegeMenu}/>
                        </li>

                        <li>Убедитесь, что результаты отображены.</li>
                        <li className={style.ImgItem}>
                            <img src={searchResults}/>
                        </li>

                        <li>Выберите понрацившееся учреждение и нажмин=те на кнопку "Сохранить" в нижней части соответствующей панели.</li>
                        <li className={style.ImgItem}>
                            <img src={saveButton}/>
                        </li>

                        <li>После этих действий страница учреждения будет сохранена в "Избранное".</li>

                    </ul>
                </li>

                <li>
                    <p className={style.Header}>Просмотр "Избранного"</p>

                    <p>Для фильтрации осуществления данных необходимо выполнить следующие шаги:</p>

                    <ul>
                        <li>Открыть веб-приложение</li>

                        <li>Перейти во вкладку "Избранное"
                        </li>
                        <li className={style.ImgItem}>
                            <img src={favMenu}/>
                        </li>

                        <li>На данной странице вы обнаружите таблицу, в которой будут находится добавленные ранее страницы учреждений.</li>
                        <li className={style.ImgItem}>
                            <img src={compareTable}/>
                        </li>

                        <li>В приведенной таблице вы можете добавлять дополнительную информацию о специальностях.</li>
                        <li className={style.ImgItem}>
                            <img src={specialtyAddition}/>
                        </li>

                        <li>Изменяя данные параметры по вашему усмотрению вы сможете просматривать и осуществлять сравнение сохраненных учреждений.</li>

                    </ul>
                </li>

            </ol>
        </div>
    );
}

export default FavoriteGuide;