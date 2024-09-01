import { NavLink } from 'react-router-dom';
import style from './testPreview.module.css';

import testPreviewBGImg from './img/testPreviewBG.svg'

import MainButton from '../../components/mainButton/mainButton.jsx';

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

                
            </div>
        </div>
    )
}

export default testPreview;