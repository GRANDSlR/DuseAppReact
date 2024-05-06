import { useEffect, useState } from 'react';
import { getAllColleges, getCollegesByTitle } from '../../services/Colleges.js';
import {  Colleges } from '../../components/CollegeHandler/CollegePanel.jsx';
import SearchBoxImageBottom from "./img/SearchPanelImgBottom.svg";
import SearchBoxImageTop from "./img/SearchPanelImgTop.svg";
import style from './SearchPage.module.css';
import SearchPanel from "../../components/MainSearchPanel/SearchPanel.jsx";
import SortFallingList from '../../components/SortFallingList/SortFallingList.jsx';
import SpecialtyFilterAdditionPanel from '../../components/SpecialtyFilterAdditionPanel/SpecialtyFilterAdditionPanel.jsx';
import CheckBoxPanel from '../../components/CheckBoxPanel/CheckBoxPanel.jsx';
import {EducationFormFilterParams, CollegeTypeFilterParams} from './DataCarrier.js';
import RangeSlider from '../../components/RangeSlider/RangeSlider.jsx';

export default function CollegePage() {

    const [collegeData, setColleges] = useState([]);
    const [loading, setLoading] = useState(true);

    const [educationForm, setEducationForm] = useState(
        sessionStorage.getItem('educationFormFilterPanel') != null ? 
        sessionStorage.getItem('educationFormFilterPanel').split(',') : []);

    const [collegeTypeFilterParams, setCollegeTypeFilterParams] = useState(
        sessionStorage.getItem('collegeTypeFilterParams') != null ? 
        sessionStorage.getItem('collegeTypeFilterParams').split(',') : []);

    const [sliderBarValues, setSliderBarValues] = useState(
        sessionStorage.getItem('sliderBarFilterValues') != null ? 
        sessionStorage.getItem('sliderBarFilterValues').split(',') : [0, 6000]);

    const CollegeTitleInputEvent = (event) =>
    getColleges(event.target.value);

    const SliderBarEvent = (state) => {
    setSliderBarValues(state);
    console.log(state);
    }

    const handleCollegeTypeCheckboxEvent = (state) =>
    setCollegeTypeFilterParams(state);

    const handleEducationFormCheckboxEvent = (state) =>
    setEducationForm(state);

    const getColleges = async (searchString) => {

        setLoading(true);

        let data;

        if (searchString == '')
            data = await getAllColleges();
        else
            data = await getCollegesByTitle(searchString);

        setLoading(false);
        setColleges(data);

    }

    useEffect(() => {

        getColleges('');

    }, []);

    return (
        <div>
            <div className={style.SearchBox}>
                <SearchPanel title='поиск по названию' CollegeTitleInputHandler={CollegeTitleInputEvent}/> 
                <img src={SearchBoxImageTop} id={style.SearchBoxImgTop}/>
                <img src={SearchBoxImageBottom} id={style.SearchBoxImgBottom}/>
            </div>
            <div className={style.ContentPanel}>
                <div className={style.FilterPanel}>
                    <SpecialtyFilterAdditionPanel />
                    <div className={style.CheckboxPanel}>
                        <p>Форма обучения</p>
                        <CheckBoxPanel sessionStorageName={'educationFormFilterPanel'} data={EducationFormFilterParams} event={handleEducationFormCheckboxEvent}/>
                    </div>
                    <div className={style.SliderBarPanel}>
                        <p>Цена за год обучения (BY)</p>
                        <RangeSlider event={SliderBarEvent}/>
                    </div>
                    <div className={style.CheckboxPanel}>
                        <p>Тип учебного заведения</p>
                        <CheckBoxPanel sessionStorageName={'collegeTypeFilterParams'} data={CollegeTypeFilterParams} event={handleCollegeTypeCheckboxEvent}/>
                    </div>
                </div>
                <div className={style.vertPanel}>
                    <div className={style.InfoPanel}>
                        {/* <p id={style.title}>Результаты поиска</p> */}
                        <div className={style.SortPanel}>
                            <p id={style.title}>Сортировка</p>
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
