import { NavLink } from 'react-router-dom';
import style from './HomePage.module.css';

import mainPicture from './img/home_page_hero_optimized.jpg';
import brainDirection from './img/icon-direction.svg';
import arrow from './img/right-arrow.png';
import mechanism from './img/Mechanism.jpg';

const HomePage = () => {
  return (
    <div className={style.MainBox}>
      <div className={style.ImgBox}>
        <img src={mainPicture}/>
        <div className={style.PageDescription}>
          <p className={style.Title}>Твое будущее начинается сейчас</p>
          <p>Apply to college for the first time or transfer to complete your degree. Navigate your entire college application journey with Common App.</p>
        </div>
      </div>

      <div className={style.TestInfoBack}>
        <div className={style.TestInfoBox}>
            <div className={style.Description}>
              <p className={style.Header}>Тест вашей карьеры</p>
              <p>Пройдите наш уникальный тест, чтобы узнать, какая профессия наиболее соответствует
                 вашим навыкам, интересам и личностным чертам. Наша функция прохождения теста на 
                 определение типа профессии поможет вам принять осознанное решение о выборе карьерного пути.</p>
              <img src={mechanism} />  
            </div>
            <div className={style.ItemBox}>
              <img src={brainDirection} />
              <p className={style.Title}>ОПРЕДЕЛЕНИЕ ТИПА ПРОФЕССИИ</p>
              <div className={style.Line}></div>
              <p>Профессия того стоит. Ваше будущее того стоит. Вы того стоите.</p>

              <NavLink to={'/test'} className={style.Link}>
                {'Пройти тест'}
                <img src={arrow} />
              </NavLink>
            </div>
        </div>
      </div>


    </div>
  );
}

export default HomePage;