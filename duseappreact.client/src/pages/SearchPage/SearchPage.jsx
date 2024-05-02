import { useEffect, useState } from 'react';
import { getAllColleges, getCollegesByTitle } from '../../services/Colleges.js';
import {  Colleges } from '../../components/CollegeHandler/CollegePanel.jsx';
import SearchBoxImageBottom from "./img/SearchPanelImgBottom.svg";
import SearchBoxImageTop from "./img/SearchPanelImgTop.svg";
import style from './SearchPage.module.css';
import filterStyle from './SearchPageFilter.module.css';
import infoStyle from './SearchPageInfo.module.css';
import SearchPanel from "../../components/MainSearchPanel/SearchPanel.jsx";
import SortFallingList from '../../components/SortFallingList/SortFallingList.jsx';
import SpecialtyFilterAdditionPanel from '../../components/SpecialtyFilterAdditionPanel/SpecialtyFilterAdditionPanel.jsx';


export default function CollegePage() {

    const [collegeData, setColleges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getColleges = async () => {
            // const data = await getAllColleges();
            const data = await getCollegesByTitle('Ин');
            setLoading(false);
            setColleges(data);
        }

        getColleges();

    }, []);


    return (
        <div>
            <div className={style.SearchBox}>
                <SearchPanel title='поиск по названию'/> 
                <img src={SearchBoxImageTop} id={style.SearchBoxImgTop}/>
                <img src={SearchBoxImageBottom} id={style.SearchBoxImgBottom}/>
            </div>
            <div className={style.ContentPanel}>
                <div className={filterStyle.FilterPanel}>
                    <SpecialtyFilterAdditionPanel />
                </div>
                <div className={style.vertPanel}>
                    <div className={infoStyle.InfoPanel}>
                        <p id={infoStyle.title}>Результаты поиска</p>
                        <div className={infoStyle.SortPanel}>
                            <p id={infoStyle.title}>Сортировка</p>
                            <SortFallingList />
                        </div>
                    </div>
                    <div className={style.ResultPanel}>
                        {loading ? <div className={style.Preloader}><p>Loading...</p></div> : <Colleges collegeObjects={collegeData} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
