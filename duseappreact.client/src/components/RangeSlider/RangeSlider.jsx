import React, { useState } from 'react';
import { Range } from 'react-range';
import style from './RangeSlider.module.css';


const TwoThumbsSlider = (event) => {

  const [values, setValues] = useState(
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

  return (
    <div>
        <div className={style.KeyboardRangeBox}>
            <div className={style.KeyboardRangeItem}>
                <span>От</span>
                <input id={style.leftRange} value={values[0]} type='number' onChange={() => event(values)}></input>
            </div>
            <div className={style.KeyboardRangeItem}>
                <span>До</span>
                <input id={style.rightRange} value={values[1]} type='number' onChange={() => event(values)}></input>
            </div>
        </div>

        <Range
        step={1}
        min={0}
        max={10000}
        values={values}
        onChange={(values) => {setSessionStorage(values); setValues(values);}}
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
            {/* {values[index]} */}
            </div>
        )}
        />
    </div>
  );
};

export default TwoThumbsSlider;



// import React, { useState } from 'react';
// import { Range } from 'react-range';
// import style from './RangeSlider.module.css';

// const TwoThumbsSlider = () => {

//   const [values, setValues] = useState([10, 90]);

//   return (
//     <Range
//       step={1}
//       min={0}
//       max={100}
//       values={values}
//       onChange={(values) => setValues(values)}
//       renderTrack={({ props, children }) => (
//         <div
//           {...props}
//           className={style.Track}
//         >
//           {children}
//         </div>
//       )}
//       renderThumb={({ props, index }) => (
//         <div
//           {...props}
//           className={style.Thumb}
//         >
//           {/* {values[index]} */}
//         </div>
//       )}
//     />
//   );
// };

// export default TwoThumbsSlider;



// import React, { useState } from 'react';

// const RangeSlider = () => {
//   const [values, setValues] = useState([0, 100]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     const index = name === 'firstSlider' ? 0 : 1;
//     const newValues = [...values];
//     newValues[index] = parseInt(value);
//     setValues(newValues);
//   };

//   return (
//     <div>
//       <input
//         type="range"
//         min={0}
//         max={100}
//         name="firstSlider"
//         value={values[0]}
//         onChange={handleChange}
//       />
//       <input
//         type="range"
//         min={0}
//         max={100}
//         name="secondSlider"
//         value={values[1]}
//         onChange={handleChange}
//       />
//       <div>
//         <span>Значение первого ползунка: {values[0]}</span>
//         <span>Значение второго ползунка: {values[1]}</span>
//       </div>
//     </div>
//   );
// };

// export default RangeSlider;
