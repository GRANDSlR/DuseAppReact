
import React, { useState } from 'react';
import style from './SliderBar.module.css';

const SliderBar = () => {

  const [sliderBarValue, setSliderBarValue] = useState(0);

  const handleChange = (event) => {
    setSliderBarValue(event.target.value);
    document.documentElement.style.setProperty('--slider-value', event.target.value);
  };

  return (
    <div className={style.MainBox}>
        <input
            type="range"
            min="0"
            max="10000"
            value={sliderBarValue}
            onChange={handleChange}
            className={style.slider}
        />
        <div className={style.sliderBarValue}><p>{sliderBarValue}</p></div>
    </div>
  );
};

export default SliderBar;
