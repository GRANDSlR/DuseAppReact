import React, { useState } from "react";
import style from './professionCard.module.css'

import arrow from './img/arrow.svg'

const professionCard = ({props}) => {

    const [isOpenDescription, setIsOpenDescription] = useState({ open: false })

    return (
        <div className={style.wrapper}>
            <img src={props.img} alt="" className={style.descripionImg}/>
            <p className={style.header}>{props.header}</p>
            <p className={style.description}>{props.description}</p>
            <div className={style.linkBox}>
                <p className={style.link}>Читать дальше</p>
                <div className={style.linkButton}  onClick={() => setIsOpenDescription({ open: !isOpenDescription.open })}>
                    <img src={arrow} alt="" className={style.linkButtonImg} />

                    {isOpenDescription && 
                    <div className={style.exDescription}>
                        <p className={style.exDescriptionText}>{props.exDescription}</p>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default professionCard;