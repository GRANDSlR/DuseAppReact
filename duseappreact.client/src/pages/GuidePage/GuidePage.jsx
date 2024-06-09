import { useEffect, useState } from 'react';
import style from './GuidePage.module.css';
//
import TestMenuButton from '../../components/TestMenuButton/TestMenuButton.jsx';
//
import Registration from '../../Relations/Guides/Registration/Registration.jsx';

const GuidePage = () => {

    const [activeTest, setActiveTest]  = useState(0);

    return (
        <div className={style.MainBox}>
            <div className={style.MenuPanel}>

                <div className={style.MenuItem} onClick={() => setActiveTest(0)}>
                    <TestMenuButton message={'Пользователь'} state={activeTest} value={0}/>
                </div>

                <div className={style.MenuItem} onClick={() => setActiveTest(1)}>
                    <TestMenuButton message={'Чат'} state={activeTest} value={1}/>
                </div>

            </div>
            <div className={style.ContentPanel}>
                {activeTest === 0 && <Registration />}
            </div>
        </div>
    );
}

export default GuidePage;