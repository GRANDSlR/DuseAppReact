import style from './footer.module.css';
import facebookImg from './img/facebook.png';
import telegramImg from './img/telegram.png';
import vkImg from './img/vk.png' 
import Menu from '../menu/menu.jsx';

export default function Footer(){
    return (
        <div className={style.MainBox}>
            <div className={style.MenuBox}>
            <div className={style.CompanyBar}>
                <span>Duse</span>
                <span>App</span>
            </div>
                <div>
                    <Menu type='footer'/>
                </div>
                <div className={style.FollowLinks}>
                    <img src={telegramImg}/>
                    <img src={facebookImg}/>
                    <img src={vkImg}/>
                </div>
            </div>
            <div className={style.CopyrightPanel}>
                <p>© Ленковец А.А., 2022-2024 Все права защищены.</p>
            </div>
        </div>
    );
}