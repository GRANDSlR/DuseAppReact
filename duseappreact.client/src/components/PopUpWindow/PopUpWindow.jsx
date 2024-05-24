
import style from './PopUpWindow.module.css';

const PopUpWindow = ({handleCodeBlock, handleState,  handleCloseEnent, windowType}) => {

    return(
        <div>
            {handleState && (
                <div>
                <div className={windowType === 'full' ? `${style.Back} ${style.Full}` : style.Back} onClick={() => handleCloseEnent(false)}></div>
                    <div className={windowType === 'full' ? `${style.Header} ${style.Full}` : style.Header}>
                        {handleCodeBlock}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PopUpWindow;