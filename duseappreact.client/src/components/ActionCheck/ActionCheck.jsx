
import style from './ActionCheck.module.css';
//
import CrossImg from '../GradePanel/img/cross.png';
import CheckImg from '../GradePanel/img/check.png';

const ActionCheck = ({closeEvent, applyEvent, message}) => {

    return (
        <div className={style.MainBox}>
            <div className={style.ContentBox}>
                <p>{message}</p>
            </div>
            <div className={style.ButtonBox}>
                    <button type='button' className={`${style.Button} ${style.Submit}`} onClick={() => {applyEvent(true); closeEvent(false)}}>
                        <img src={CheckImg}></img>
                    </button> 
                    <button type='button' className={style.Button} onClick={() => closeEvent(false)}>
                        <img src={CrossImg}></img>
                    </button> 
                </div>
        </div>
    );
}

export default ActionCheck;