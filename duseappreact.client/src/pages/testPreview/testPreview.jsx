import React, { useEffect } from "react";

import { NavLink } from 'react-router-dom';
import style from './testPreview.module.css';

import testPreviewBGImg from './img/testPreviewBG.svg'

import MainButton from '../../components/mainButton/mainButton.jsx';
import LiveLine from './liveLine/liveLine.jsx';

import Slider from '../../components/slider/slider.jsx'

import professionCards from './professionCards/professionCards.js';

import ProfessionCard from '../../components/professionCard/professionCard.jsx';

import chart from './img/chart.svg'

const testPreview = () => {

    return (
        <div className={style.wrapper}>
            <div className={style.page}>
                <img src={testPreviewBGImg} className={style.testPreviewBG} alt="" />
                <div className={style.previewContent}>
                    <p className={style.pageHeader}>Профессия для тебя</p>
                    <p className={style.pageDescription}>В одном тесте — твоя склонность к профессиональным интересам и подбор специализации</p>
                    <div className={style.buttonCase}>
                        <MainButton content={'Пройти тест'} />
                    </div>
                </div>

                              
                <div className={style.liveLine}>

                    <p className={style.blockHeader}>Как это работает?</p>

                    <LiveLine />
                </div>

                <div className={style.chartBlock}>

                    <p className={style.blockHeader}>Что ты узнаешь о себе?</p>

                    <div className={style.chartBox}>
                        <img src={chart} className={style.chart} alt="" />

                        <div className={style.chartDescription}>
                            <p>Наибольшая сумма баллов в диаграмме указывает на наиболее подходящий вам тип профессии, который обозначен буквами П (природа), Т (техника), З (знак), И (искусство), Ч (человек).</p>
                            <p>4-5 баллов – выраженный интерес, 2-3 – умеренный интерес; 0-1 – отсутствие интереса. </p>
                        </div>
                    
                    </div>
                </div>

                <div className={style.slider}>

                    <p className={style.blockHeader}>Какие бывают типы профессий?</p>
                    <p className={style.blockDescription}>В соответствии с данной классификацией мир современных профессий можно разделить на 5 основных типов</p>
                    
                    <div className={style.sliderBar}>
                        <Slider Card={ProfessionCard} cardContent={professionCards}/>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default testPreview;