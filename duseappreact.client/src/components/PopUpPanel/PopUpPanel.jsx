
import React from 'react';
import style from './PopUpPanel.module.css';

const PopUpPanel = ({closeEvent, handleCodeBlock}) => {

    return (
        <div>
            {handleState && (
                <div>
                <div className={windowType === 'full' ? `${style.Back} ${style.Full}` : style.Back} onClick={() => closeEvent(false)}></div>
                    <div className={windowType === 'full' ? `${style.Header} ${style.Full}` : style.Header}>
                        {handleCodeBlock}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PopUpPanel;