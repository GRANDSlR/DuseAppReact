import { NavLink } from 'react-router-dom';
import style from './homePage.module.css';
import infoStyle from './infoStyle.module.css';

import homeBGImg from './img/homeBG.svg'
import searchImg from './img/search.png'
import bookImg from './img/book.png'
import hatImg from './img/hat.png'

import MainButton from '../../components/mainButton/mainButton.jsx';

const homePage = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.page}>
                <img src={homeBGImg} className={style.homeBG} alt="" />
                <div className={style.previewContent}>
                    <p className={style.pageHeader}>Учеба Карьера Инновации</p>
                    <p className={style.pageDescription}>На шаг ближе к мечте — выбирайте учебное заведение</p>
                    <div className={style.buttonCase}>
                        <MainButton content={'Начни искать'} />
                    </div>
                </div>

                <div className={infoStyle.infoPanel}>
                    <div className={infoStyle.infoItem}>
                        <div className={infoStyle.infoImg}>
                            <img src={searchImg} id={infoStyle.searchImg}/>
                        </div>
                        <div className={infoStyle.infoText}>
                            <p className={infoStyle.header}>Откройте для себя вашу профессию</p>
                            <p className={infoStyle.description}>Определите, какой карьерный путь вы хотите избрать, выбрав подходящий колледж. Наш тест на профессиональную ориентацию поможет вам в этом.</p>
                            <div className={infoStyle.mainButtonCase}>
                                <MainButton content={'Пройти тест'} />
                            </div>
                        </div>
                    </div>
                    <div className={infoStyle.infoItem}>
                        
                        <div className={`${infoStyle.infoText} ${infoStyle.rightAlign}`}>
                            <p className={infoStyle.header}>В чем преимущество образования</p>
                            <p className={infoStyle.description}>Общеизвестно, что специализированное образование позволяет лучше конкурировать на рынке труда. Выпускник колледжа зарабатывает как минимум на 33% в год больше, чем выпускник средней школы. </p>
                        </div>

                        <div className={`${infoStyle.infoImg} ${infoStyle.rightAlign}`}>
                            <img src={bookImg} id={infoStyle.bookImg}/>

                        </div>
                    </div>
                    <div className={infoStyle.infoItem}>
                        <div className={infoStyle.infoImg}>
                            <img src={hatImg} id={infoStyle.hatImg}/>

                        </div>
                        <div className={infoStyle.infoText}>
                            <p className={infoStyle.header}>Находите заведения в вашем городе</p>
                            <p className={infoStyle.description}>Сегодня в беларуси существует более 1000 вариантов получения послесреднего образования. К ним относятся колледжи и университеты, специализированные программы и программы преддипломного образования.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default homePage;