import style from './liveLine.module.css';

import liveLineImg from './img/liveLine.svg'

const testPreview = () => {
    return (
        <div className={style.wrapper}>
            <img src={liveLineImg} alt="" id={style.liveLineImg}/>
            <p className={style.blockHeader}>Как это работает?</p>
            <div className={`${style.block} ${style.block1}`}>
                <div className={style.numberBox}>
                    <div className={style.innerBox}>
                        <p className={style.boxNumber}></p>
                    </div>
                </div>
                <img src="" alt="" className={style.textLine} />
                <p className={style.header}></p>
                <p className={style.description}></p>
            </div>
            <div className={`${style.block} ${style.block2}`}></div>
            <div className={`${style.block} ${style.block3}`}></div>
        </div>
    )
}

export default testPreview;