import { useEffect, useState } from 'react';
import style from './GuidePage.module.css';
//
import TestMenuButton from '../../components/TestMenuButton/TestMenuButton.jsx';
//
import Registration from '../../processes/Guides/Registration/Registration.jsx';
import Search from '../../processes/Guides/Search/Search.jsx';
import Favorite from '../../processes/Guides/Favorite/Favorite.jsx';

const GuidePage = () => {

    const [activeTest, setActiveTest]  = useState(0);

    return (
        <div className={style.MainBox}>
            <div className={style.MenuPanel}>

                <div className={style.MenuItem} onClick={() => setActiveTest(0)}>
                    <TestMenuButton message={'Пользователь'} state={activeTest} value={0}/>
                </div>

                <div className={style.MenuItem} onClick={() => setActiveTest(1)}>
                    <TestMenuButton message={'Поиск и фильтрация'} state={activeTest} value={1}/>
                </div>

                <div className={style.MenuItem} onClick={() => setActiveTest(2)}>
                    <TestMenuButton message={'Избранное'} state={activeTest} value={2}/>
                </div>

            </div>
            <div className={style.ContentPanel}>
                {activeTest === 0 && <Registration />}
                {activeTest === 1 && <Search />}
                {activeTest === 2 && <Favorite />}
            </div>
        </div>
    );
}

export default GuidePage;