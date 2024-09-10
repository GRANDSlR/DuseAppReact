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
                    <p className={style.description}>Методика основана на классификации профессиональных интересов. Позволяет установить вашу область  специализации</p>
                </div>
                <div className={`${style.block} ${style.block2}`}>

                    <p className={style.header}>Обработка</p>
                    <p className={style.description}>Каждый вопрос в тесте имеет свой вес в одной из типовых сфер профессий: человек, техника, природа, числа/символы, искусство</p>
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
                    <p className={style.header}>Результат</p>
                    <p className={style.description}>После прохождения теста индивидуально для вас будет подобран спектр учебных направлений и наиболее приоритетных учебных заведений</p>
                </div>
            </div>
        </div>
    )
}

export default testPreview;