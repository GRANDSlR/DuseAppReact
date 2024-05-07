import React, { useState } from 'react';
import { Range } from 'react-range';
import style from './RangeSlider.module.css';


const TwoThumbsSlider = (event) => {

  const [values, setValues] = useState(
    sessionStorage.getItem('sliderBarFilterValues') != null ? 
    sessionStorage.getItem('sliderBarFilterValues').split(',') : [0, 6000]);

  const [inputValues, setInputValues] = useState(
    sessionStorage.getItem('sliderBarFilterValues') != null ? 
    sessionStorage.getItem('sliderBarFilterValues').split(',') : [0, 6000]);
  
  const getProgressWidth = () => {
    const max = 10000;
    const min = 0;
    return ((values[1] - values[0]) / (max - min)) * 100;
  };

  const setSessionStorage = (values) => {
    sessionStorage.setItem('sliderBarFilterValues', values);
  }

  const handleInputChange = (index, event) => {
    const newValues = [...inputValues];
    newValues[index] = Math.min(Math.max(0, parseInt(event.target.value)), 10000);
    if(newValues[0] < newValues[1])
    {
      setValues(newValues);
      setInputValues(newValues);
      setSessionStorage(newValues);
    }
    else
      setInputValues(newValues);
};
  return (
    <div>
        <div className={style.KeyboardRangeBox}>
            <div className={style.KeyboardRangeItem}>
                <span>От</span>
                <input id={style.leftRange} value={inputValues[0]} type='number' onChange={(e) => handleInputChange(0, e)}></input>
            </div>
            <div className={style.KeyboardRangeItem}>
                <span>До</span>
                <input id={style.rightRange} value={inputValues[1]} type='number' onChange={(e) => handleInputChange(1, e)}></input>
            </div>
        </div>
        <Range
        step={1}
        min={0}
        max={10000}
        values={values}
        onChange={(values) => {setSessionStorage(values); setValues(values); setInputValues(values); event.event(values)}}
        renderTrack={({ props, children }) => (
            <div
            {...props}
            className={style.Track}
            style={{
                ...props.style,
                position: 'relative',
            }}
            >
            {}
            <div
                className={style.Progress}
                style={{
                position: 'absolute',
                left: `${values[0]/100}%`,
                width: `${getProgressWidth()}%`,
                }}
            />
            {children}
            </div>
        )}
        renderThumb={({ props, index }) => (
            <div
            {...props}
            className={style.Thumb}
            >
              <div className={style.Values}>
                <div className={style.triangleUp}>
                  <div></div>
                </div>
                <div className={style.ValueBox}>
                  {values[index]}
                </div>
              </div>
            </div>
        )}
        />
    </div>
  );
};

export default TwoThumbsSlider;