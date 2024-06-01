
import React from 'react';
import style from './ErrorPanel.module.css';

const ErrorPanel = ({closeEvent, errorMessage}) => {

    return (
        <div className={style.MainBox}>
            <p>{errorMessage}</p>
            <button type='button' onClick={() => closeEvent(false)}>ОК</button>
        </div>
    );
}

export default ErrorPanel;