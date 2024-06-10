import { useEffect, useState } from 'react';
import { getCollegesByFilterParams } from '../../services/Colleges.js';
import {  Colleges } from '../../components/CollegeHandler/CollegePanel.jsx';
import SearchBoxImageBottom from "./img/SearchPanelImgBottom.svg";
import SearchBoxImageTop from "./img/SearchPanelImgTop.svg";
import style from './SearchPage.module.css';
import SearchPanel from "../../components/MainSearchPanel/SearchPanel.jsx";
import SortFallingList from '../../components/SelectModule/SelectModule.jsx';
import SpecialtyFilterAdditionPanel from '../../components/SpecialtyFilterAdditionPanel/SpecialtyFilterAdditionPanel.jsx';
import CheckBoxPanel from '../../components/CheckBoxPanel/CheckBoxPanel.jsx';
import {EducationFormFilterParams, CollegeTypeFilterParams} from '../../services/DataCarrier.js';
import RangeSlider from '../../components/RangeSlider/RangeSlider.jsx';
import {sortData as sortValues, sortByTitle, sortByTitleReverse, sortByGrade, sortByGradeReverse} from '../../components/SelectModule/SortHandler.js';
import CollegePreloader from '../../components/CollegePreloader/CollegePreloader.jsx';


export default function SearchPage() {

    const [collegeData, setColleges] = useState(
        sessionStorage.getItem('currCollegeData') != null ? 
        JSON.parse(sessionStorage.getItem('currCollegeData')) : []);

    const [sortValue, setSortValue] = useState(sortValues[0]);

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
        educationForm == '' ? setEducationForm(EducationFormFilterParams) : null;
    }, [educationForm]);

    useEffect(() => {
        collegeTypeFilterParams == '' ? setCollegeTypeFilterParams(CollegeTypeFilterParams) : null;
    }, [collegeTypeFilterParams]);

    const SortCollegeData = (collegeDataArray) =>{
        if(collegeDataArray!=null && collegeDataArray.length>0)
        {
            if(sortValue === sortValues[0])
                return sortByTitle(collegeDataArray);
            if(sortValue === sortValues[1])
                return sortByTitleReverse(collegeDataArray);
            if(sortValue === sortValues[2])
                return sortByGrade(collegeDataArray);
            if(sortValue === sortValues[3])
                return sortByGradeReverse(collegeDataArray);
        }
    }
    
    useEffect(() => {
        if(collegeData!=null)
            sessionStorage.setItem('currCollegeData', JSON.stringify(collegeData));
    }, [collegeData]);

    useEffect(() => {

        const fetchData = async () => {
            if(educationForm.length>0 && collegeTypeFilterParams.length>0)
            {
                let result = await GetColleges(collegeTitleSearch);

                result = SortCollegeData(result);

                setColleges(result != null && result.length>0 ? result : null);
            }
        }
        fetchData();

    }, [specialties, educationForm,
        collegeTypeFilterParams, sliderBarValues]);

    useEffect(() => {

        setColleges(SortCollegeData(collegeData));
        
    }, [sortValue]);

    const CollegeTitleInputEvent = async (event) =>
    {
        setCollegeTitleSearch(event.target.value);

        let result = await GetColleges(event.target.value);

        result = SortCollegeData(result);

        setColleges(result != null && result.length>0 ? result : null);
    }

    const GetColleges = async (searchString) => {

        setLoading(true);

        const result = await getCollegesByFilterParams(
            {
                'title': searchString,
                'specialties': specialties != '' ? specialties : [],
                'educationForm': educationForm,
                'collegeTypeFilterParams': collegeTypeFilterParams, 
                'costValues': [sliderBarValues[0].toString(), sliderBarValues[1].toString()]
            });

        setLoading(false);

        return result;
    }

    const SliderBarEvent = (state) => 
    setSliderBarValues(state);

    const SortValueEvent = (state) => 
    setSortValue(state);

    const SpecialtyCheckboxEvent = (state) => 
    setSpecialties(state);

    const handleCollegeTypeCheckboxEvent = (state) =>
    setCollegeTypeFilterParams(state);

    const handleEducationFormCheckboxEvent = (state) =>
    setEducationForm(state);

    return (
        <div>
            <div className={style.SearchBox}>
                <SearchPanel title='поиск по названию' CollegeTitleInputHandler={CollegeTitleInputEvent}/> 
                <img src={SearchBoxImageTop} id={style.SearchBoxImgTop}/>
                <img src={SearchBoxImageBottom} id={style.SearchBoxImgBottom}/>
            </div>
            <div className={style.ContentPanel}>
                <div className={style.FilterPanel}>
                    <div className={style.SpecialtyPanel}>
                        <SpecialtyFilterAdditionPanel event={SpecialtyCheckboxEvent} sessionStorageName={'specialtyFilterParams'}/>
                    </div>
                    <div className={style.CheckboxPanel}>
                        <p>Форма обучения</p>
                        <CheckBoxPanel sessionStorageName={'educationFormFilterPanel'} data={EducationFormFilterParams} event={handleEducationFormCheckboxEvent}/>
                    </div>
                    <div className={style.SliderBarPanel}>
                        <p>Цена за год обучения (BYN)</p>
                        <RangeSlider eventSetValues={SliderBarEvent}/>
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
                            <SortFallingList defaultValue={sortValues[0]} data={sortValues} actionFunc={SortValueEvent}/>
                        </div>
                    </div>
                    <div className={style.ResultPanel}>
                        {/* <div className={style.Preloader}>
                            <CollegePreloader />
                            <CollegePreloader />
                            <CollegePreloader />
                            <CollegePreloader />
                        </div> */}
                        {loading ? 
                        <div className={style.Preloader}>
                            <CollegePreloader />
                            <CollegePreloader />
                            <CollegePreloader />
                            <CollegePreloader />
                        </div> 
                        : <Colleges collegeObjects={collegeData} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
