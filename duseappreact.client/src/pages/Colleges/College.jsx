import { useEffect, useState } from 'react';
import { getAllColleges } from '../../services/Colleges.js';
import { Colleges } from '../../components/CollegeHandler/Colleges.jsx';
import SearchBoxImage from "./img/SearchBoxImage.svg";
import style from './CollegePage.module.css';
import SearchPanel from "../../components/MainSearchPanel/SearchPanel.jsx";


export default function CollegePage() {

    const [collegeData, setColleges] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getColleges = async () => {
            const data = await getAllColleges();
            setLoading(false);
            setColleges(data);
        }

        getColleges();

    }, []);

    return (
        <div>
            
            <div className={style.SearchBox}>
                <SearchPanel title='поиск по названию'/> 
                <img src={SearchBoxImage} id={style.SearchBoxImage}/>
            </div>
            {loading ? <div className={style.Preloader}><p>Loading...</p></div> : <Colleges collegeObjects={collegeData} />}
        </div>
    );
}