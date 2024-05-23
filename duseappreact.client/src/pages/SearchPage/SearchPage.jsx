import { useEffect, useState } from 'react';
import { getCollegesByFilterParams } from '../../services/Colleges.js';
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

    const [collegeData, setColleges] = useState(
        sessionStorage.getItem('currCollegeData') != null ? 
        JSON.parse(sessionStorage.getItem('currCollegeData')) : []);

    const [loading, setLoading] = useState(true);

    const [collegeTitleSearch, setCollegeTitleSearch] = useState('');

    const [specialties, setSpecialties] = useState(
        sessionStorage.getItem('specialtyFilterParams') != null ? 
        sessionStorage.getItem('specialtyFilterParams').split(',') : []);

    const [educationForm, setEducationForm] = useState(
        sessionStorage.getItem('educationFormFilterPanel') != null ?
        sessionStorage.getItem('educationFormFilterPanel').split(',') : EducationFormFilterParams);

    const [collegeTypeFilterParams, setCollegeTypeFilterParams] = useState(
        sessionStorage.getItem('collegeTypeFilterParams') != null ? 
        sessionStorage.getItem('collegeTypeFilterParams').split(',') : CollegeTypeFilterParams);

    const [sliderBarValues, setSliderBarValues] = useState(
        sessionStorage.getItem('sliderBarFilterValues') != null ? 
        sessionStorage.getItem('sliderBarFilterValues').split(',') : [0, 6000]);


    if(sessionStorage.getItem('educationFormFilterPanel') === null)
        sessionStorage.setItem('educationFormFilterPanel', EducationFormFilterParams)

    if(sessionStorage.getItem('collegeTypeFilterParams') === null)
        sessionStorage.setItem('collegeTypeFilterParams', collegeTypeFilterParams)

    useEffect(() => {

        const fetchData = async () => {
            if(specialties.length>0 && educationForm.length>0 && collegeTypeFilterParams.length>0)
            {
                const result = await getColleges(collegeTitleSearch);
                setColleges(result != null || result!=[] ? result : null);
            }
        }
        fetchData();

    }, [specialties, educationForm,
        collegeTypeFilterParams, sliderBarValues]);

    useEffect(() => {
        educationForm == '' ? setEducationForm(EducationFormFilterParams) : null;
    }, [educationForm]);

    useEffect(() => {
        collegeTypeFilterParams == '' ? setCollegeTypeFilterParams(CollegeTypeFilterParams) : null;
    }, [collegeTypeFilterParams]);

    useEffect(() => {
        if(collegeData!=null)
            sessionStorage.setItem('currCollegeData', JSON.stringify(collegeData));
    }, [collegeData]);
    

    const CollegeTitleInputEvent = async (event) =>
    {
        setCollegeTitleSearch(event.target.value);

        console.log(event.target.value);

        const result = await getColleges(event.target.value);
        setColleges(result != null || result!=[] ? result : null);
    }

    const SliderBarEvent = (state) => 
    setSliderBarValues(state);

    const SpecialtyCheckboxEvent = (state) => 
    setSpecialties(state);

    const handleCollegeTypeCheckboxEvent = (state) =>
    setCollegeTypeFilterParams(state);

    const handleEducationFormCheckboxEvent = (state) =>
    setEducationForm(state);

    const getColleges = async (searchString) => {

        setLoading(true);

        const result = await getCollegesByFilterParams(
            {
                'title': searchString,
                'specialties': specialties,
                'educationForm': educationForm,
                'collegeTypeFilterParams': collegeTypeFilterParams, 
                'costValues': [sliderBarValues[0].toString(), sliderBarValues[1].toString()]
            });

        setLoading(false);

        return result;
    }

    return (
        <div>
            <div className={style.SearchBox}>
                <SearchPanel title='поиск по названию' CollegeTitleInputHandler={CollegeTitleInputEvent}/> 
                <img src={SearchBoxImageTop} id={style.SearchBoxImgTop}/>
                <img src={SearchBoxImageBottom} id={style.SearchBoxImgBottom}/>
            </div>
            <div className={style.ContentPanel}>
                <div className={style.FilterPanel}>
                    <SpecialtyFilterAdditionPanel event={SpecialtyCheckboxEvent}/>
                    <div className={style.CheckboxPanel}>
                        <p>Форма обучения</p>
                        <CheckBoxPanel sessionStorageName={'educationFormFilterPanel'} data={EducationFormFilterParams} event={handleEducationFormCheckboxEvent}/>
                    </div>
                    <div className={style.SliderBarPanel}>
                        <p>Цена за год обучения (BYN)</p>
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
