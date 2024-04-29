import style from './Footer.module.css';
import duseAppImg from './img/DuseApp.svg';
import facebookImg from './img/facebook.svg';
import instagramImg from './img/instagram.svg';
import emailImg from './img/email.svg' 
import Menu from '../Menu/Menu.jsx';

export default function Footer(){
    return (
        <div className={style.MainBox}>
            <div className={style.MenuBox}>
                <div className={style.IconBox}>
                    <img src={duseAppImg} />
                </div>
                <div>
                    <Menu type='footer'/>
                </div>
                <div className={style.FollowLinks}>
                    <img src={facebookImg}/>
                    <img src={instagramImg}/>
                    <img src={emailImg}/>
                </div>
            </div>
            <div className={style.CopyrightPanel}>
                <p>© Ленковец А.А., 2022-2024 Все права защищены.</p>
            </div>
        </div>
    );
}