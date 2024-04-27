import style from './Footer.module.css';
import duseAppImg from './img/DuseApp.svg'

export default function Footer(){
    return (
        <div className={style.MainBox}>
            <img src={duseAppImg} />
            
        </div>
    );
}