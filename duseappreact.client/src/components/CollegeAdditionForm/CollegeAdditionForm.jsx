import React, {useState, useEffect} from 'react'
import style from './CollegeAdditionForm.module.css';
//
import CrossImg from '../CommentHandler/img/Cross.png';
import CheckImg from '../CommentHandler/img/Check.png';
//
import SelectModule from '../SelectModule/SelectModule.jsx';
import SpecialtyAdditionPanel from '../SpecialtyAdditionPanel/SpecialtyAdditionPanel.jsx';
import SpecialtyPanel from '../SpecialtyPanel/SpecialtyPanel.jsx';
//
import {CollegeTypeFilterParams, EducationFormFilterParams, Ownership} from '../../services/DataCarrier.js';
import ExceptionState from '../../services/ApplicationException.js';


const CollegeAdditionForm = ({collegeId, closeEvent, data, actionFunc}) => {

    const [title, setTitle] = useState(data !== null ? JSON.parse(data).collegeHeader.title : '');

    const [description, setDescription] = useState(data !== null ? JSON.parse(data).collegeDescription.description : '');

    const [collegeType, setCollegeType] = useState(data !== null ? CollegeTypeFilterParams[JSON.parse(data).collegeDescription.collegeType] : CollegeTypeFilterParams[0]);

    const [ownershipValue, setOwnershipValue] = useState(data !== null ? Ownership[JSON.parse(data).collegeDescription.ownership] : Ownership[0]);

    const [websiteRef, setWebSiteRef] = useState(data !== null ? JSON.parse(data).collegeDescription.webSiteRef : '');

    const [region, setRegion] = useState(data !== null ? JSON.parse(data).collegeLocation.region : '');

    const [lat, setLat]  = useState(data !== null ? JSON.parse(data).collegeLocation.lat : '');

    const [long, setLong]  = useState(data !== null ? JSON.parse(data).collegeLocation.long : '');


    const getCurrSpecialties = () =>{

        let specialtyList = JSON.parse(data).specialtyList;

        let updatedCost = specialtyList.map(function(item) {
            return {
              ...item,
              educationForm: EducationFormFilterParams[item.educationForm]
            };
          });

          return updatedCost;
    }
    
    
    const [specialtyAddition, setSpecialtyAddition] = useState(false);

    const [specialties, setSpecialties] = useState(data !== null ? getCurrSpecialties() : null);

    const [specialtyTitleToEdit, setSpecialtyTitleToEdit] = useState(false);

    

    const verifyFields = () => {

        if(title === '')
        {
            ExceptionState.setException(true, "Ошибка. Заполните поле наименования учреждения");
            return false;
        }

        if(description === '')
        {
            ExceptionState.setException(true, "Ошибка. Заполните поле 'Описание'");
            return false;
        }

        if(websiteRef === '')
        {
            ExceptionState.setException(true, "Ошибка. Заполните поле 'Ссылка на первоисточник'");
            return false;
        }

        if(region === '')
        {
            ExceptionState.setException(true, "Ошибка. Заполните поле 'Локация'");
            return false;
        }

        if(lat === '')
        {
            ExceptionState.setException(true, "Ошибка. Заполните поле 'Широта'");
            return false;
        }

        if(long === '')
        {
            ExceptionState.setException(true, "Ошибка. Заполните поле 'Долгота'");
            return false;
        }

        return true;
    }

    const sendData = () => {

        if(verifyFields)
        {

            console.log('websiteRef ',websiteRef);
            actionFunc({
                collegeHeader:{
                    collegeId: collegeId,
                    title: title,
                    img: ''
                },
                collegeDescription:{
                    description: description,
                    grade: JSON.parse(data).collegeDescription.grade,
                    collegeType: collegeType,
                    ownership: ownershipValue,
                    websiteRef: websiteRef
                },
                collegeLocation:{
                    region: region,
                    lat: lat,
                    long: long
                },
                specialtyList: specialties
            })
        }
    }

    const getSpecialtyData = (title) => {

        if(specialties !== null && Array.isArray(specialties))
        {
            return specialties.filter(item => item.title === title);
        }
    }

    const addSpecialty = (data) => {

        if(data !== null)
            if (specialties !== null)
                setSpecialties([...specialties, data]);
            else
                setSpecialties([data]);

    }

    const getSpecialtyNameList = () => {

        if(Array.isArray(specialties))
        {
            return specialties.map(item => item.title);
        }
    }

    const editSpecialties = (data) => {

        if(data !== null)
        {
            if(specialties.length > 1)
            {
                let specialtiesWithoutEdited = specialties.filter(item => item.title !== specialtyTitleToEdit)

                setSpecialties([...specialtiesWithoutEdited, data]);
            }
            else
                setSpecialties([data]);
        }
        else{

            let specialtiesWithoutEdited = specialties.filter(item => item.title !== specialtyTitleToEdit)

            setSpecialties([...specialtiesWithoutEdited]);
        }

        setSpecialtyTitleToEdit(false);
    }

    return (

        <div className={style.MainBox}>
            <div className={style.ContentBox}>
                <div className={style.MainInfo}> 
                    <div className={style.HorizPanel}>
                        <div className={style.Header}>
                            <p className={style.Title}>Описание</p>
                            <p>Основная информация</p>
                        </div>
                    </div>

                    <div className={style.HorizPanel}>
                        <div className={style.Item}>
                            <p className={style.DescTitle}>Наименование</p>
                            <div className={style.InputBox}>
                                <input type='text' value={title} onChange={(event) => setTitle(event.target.value)} placeholder='Название учреждения'></input>
                            </div>
                        </div>
                        <div className={style.Item}>
                            <p className={style.DescTitle}>Фото</p>
                            <div className={style.InputBox}>
                                <input type='text' placeholder='Путь'></input>
                                <p className={style.InputButton}>Открыть</p>
                            </div>
                        </div>
                    </div>

                    <div className={style.HorizPanel}>
                        <div className={style.Item}>
                            <p className={style.DescTitle}>Тип</p>
                            <SelectModule defaultValue={collegeType} data={CollegeTypeFilterParams} actionFunc={setCollegeType} />
                        </div>
                        <div className={style.Item}>
                            <p className={style.DescTitle}>Форма собственности</p>
                            <SelectModule defaultValue={ownershipValue} data={Ownership} actionFunc={setOwnershipValue} />
                        </div>
                    </div>

                    <div className={style.Row}>
                        <p className={style.DescTitle}>Ссылка на первоисточник</p>
                        <div className={style.InputBox}>
                            <input type='text' value={websiteRef} onChange={(event) => setWebSiteRef(event.target.value)} placeholder='URL-адрес'></input>
                        </div>
                    </div>

                    <p className={style.DescTitle}>Координаты</p>
                    <div className={style.HorizPanel}>
                        <div className={style.Item}>
                            <div className={style.InputBox}>
                                <input type='number' value={lat} onChange={(event) => setLat(event.target.value)} placeholder='Широта'></input>
                            </div>
                        </div>
                        <div className={style.Item}>
                            <div className={style.InputBox}>
                                <input type='number' value={long} onChange={(event) => setLong(event.target.value)} placeholder='Долгота'></input>
                            </div>
                        </div>
                    </div>

                    <div className={style.Row}>
                        <p className={style.DescTitle}>Локация</p>
                        <div className={style.InputBox}>
                            <input type='text' value={region} onChange={(event) => setRegion(event.target.value)} placeholder='Название локации'></input>
                        </div>
                    </div>

                    <p className={style.DescTitle}>Описание</p>
                    <div className={`${style.InputBox} ${style.DescPanel}`}>
                        <textarea onChange={(event) => setDescription(event.target.value)}>{description}</textarea>
                    </div>


                </div>

                <div className={style.SpecialtyBox}>

                    <div className={style.HorizPanel}>
                        <div className={style.Header}>
                            <p className={style.Title}>Специальности</p>
                            <p>Управляйте специальностями</p>
                        </div>

                        <button type='button' className={style.SpecialtyAdditionButton} onClick={() => setSpecialtyAddition(true)}>Добавить</button>
                    </div>

                    <SpecialtyPanel speсialtyList={getSpecialtyNameList()} actionClick={setSpecialtyTitleToEdit}/>

                    {specialtyAddition && 
                        <SpecialtyAdditionPanel closeEvent={setSpecialtyAddition} data={null} additionAction={addSpecialty}/>
                    }

                    {specialtyTitleToEdit !== false && 
                        <SpecialtyAdditionPanel closeEvent={setSpecialtyTitleToEdit} data={getSpecialtyData(specialtyTitleToEdit)} additionAction={editSpecialties}/>
                    }

                </div>
            </div>

            <div className={style.WindowButtonBox}>
                <button type='button' className={`${style.Button} ${style.Exit}`} onClick={() => closeEvent(false)}>
                    <img src={CrossImg}></img>
                </button>
                <button type='button' className={`${style.Button} ${style.ChangeUserData}`} onClick={() => sendData()}>
                    <img src={CheckImg}></img>
                </button>
            </div>
        </div>
    );
}

export default CollegeAdditionForm;