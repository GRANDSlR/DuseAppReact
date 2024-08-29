import { useEffect, useState } from 'react';
import style from './TestPage.module.css';
//
import TestMenuButton from '../../components/TestMenuButton/TestMenuButton.jsx';
import TestKlimova from '../../processes/TestKlimova/TestKlimova.jsx';

const TestPage = () => {

    const [activeTest, setActiveTest]  = useState(0);

    return (
        <div className={style.MainBox}>
            <div className={style.MenuPanel}>

                <div className={style.MenuItem} onClick={() => setActiveTest(0)}>
                    <TestMenuButton message={'Тип профессии'} state={activeTest} value={0}/>
                </div>

                <div className={style.MenuItem} onClick={() => setActiveTest(1)}>
                    <TestMenuButton message={'Чат'} state={activeTest} value={1}/>
                </div>

            </div>
            <div className={style.ContentPanel}>
                {activeTest === 0 && <TestKlimova />}
            </div>
        </div>
    );
}

export default TestPage;