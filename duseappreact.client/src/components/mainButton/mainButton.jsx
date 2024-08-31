import { NavLink } from 'react-router-dom';
import style from './mainButton.module.css';

const mainButton = ({content}) => {
    return (
    <div className={style.wrapper}>
        <p>{content}</p>
        <div className={style.pointBG}>
            <div className={style.point}></div>
        </div>
    </div>
    )
}

export default mainButton;