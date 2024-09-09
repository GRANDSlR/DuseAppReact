import React, { useRef } from "react";
import style from './slider.module.css'

import lightArrow from './img/lightArrow.svg'

const slider = ({Card, cardContent}) => {

    const scrollRef = useRef(null);

        const scrollToRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                left: scrollRef.current.scrollLeft + 305, 
                behavior: 'smooth', 
            });
        }
    };

    const scrollToLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                left: scrollRef.current.scrollLeft - 305, 
                behavior: 'smooth', 
            });
        }
    };

    return (
        <div className={style.wrapper}>

            <img src={lightArrow} alt="" onClick={scrollToLeft} className={style.arrow}/>
            
            <div className={style.sliderBar} ref={scrollRef}>
                {Array.isArray(cardContent) && cardContent.map((item, index) => (
                    <div className={style.sliderItem} key={index}><Card props={item} /></div>
                ))}
            </div>
            <img src={lightArrow} alt="" onClick={scrollToRight} className={`${style.arrow} ${style.right}`}/>
        </div>
    )
}

export default slider;