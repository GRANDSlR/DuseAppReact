import dots from './img/dots.svg';
import dotsActive from './img/dotsActive.svg';
import style from './TestMenuButton.module.css';


const TestMenuButton = ({message, state, value}) =>{

    return (
        <button className={state === value ? `${style.MenuItem} ${style.Active}` : style.MenuItem}>
            <p>{message}</p>
            <img src={state === value ? dotsActive : dots}></img>
        </button>
    );

}

export default TestMenuButton;