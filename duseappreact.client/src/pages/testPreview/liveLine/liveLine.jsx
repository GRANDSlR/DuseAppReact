import style from './liveLine.module.css';

import liveLineImg from './img/liveLineLong2.svg'
import lineImg from './img/Line.svg'

const testPreview = () => {
    return (
        <div className={style.wrapper}>
            <img src={liveLineImg} alt="" id={style.liveLineImg}/>
            <div className={style.blockBox}>
                <div className={`${style.block} ${style.block1}`}>
                    <div className={style.numberBox}>
                        <div className={style.innerBox}>
                            <p className={style.boxNumber}>1</p>
                        </div>
                    </div>
                    <img src={lineImg} alt="" className={style.textLine} />
                    <p className={style.header}>Описание</p>
                    <p className={style.description}>Методика основана на классификации профессиональных интересов. Позволяет установить в какой области старшекласснику лучше всего выбрать специальность, по которой он будет проходить профессиональное обучение после школы.</p>
                </div>
                <div className={`${style.block} ${style.block2}`}>

                    <p className={style.header}>Обработка</p>
                    <p className={style.description}>По каждому столбцу подсчитать алгебраическую, то есть с учетом знаков, сумму. Зачеркнутые цифры не считать. Записать их в строку «Результаты».</p>
                    <img src={lineImg} alt="" className={style.textLine} />
                    <div className={style.numberBox}>
                        <div className={style.innerBox}>
                            <p className={style.boxNumber}>2</p>
                        </div>
                    </div>
                </div>
                <div className={`${style.block} ${style.block3}`}>
                    <div className={style.numberBox}>
                        <div className={style.innerBox}>
                            <p className={style.boxNumber}>3</p>
                        </div>
                    </div>
                    <img src={lineImg} alt="" className={style.textLine} />
                    <p className={style.header}>Инструкция</p>
                    <p className={style.description}>Прочитай данные утверждения. Если ты согласен с ними, то перед цифрой в таблице поставь "+", если нет, поставь перед цифрой "—". Если ты сомневаешься, зачеркни цифру".</p>
                </div>
            </div>
        </div>
    )
}

export default testPreview;