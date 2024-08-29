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
import ExceptionState from '../../features/exceptions/ApplicationException.js';


const CollegeAdditionForm = ({collegeId, closeEvent, data, actionFunc}) => {

    const [title, setTitle] = useState(data !== null ? JSON.parse(data).collegeHeader.title : '');

    const [img, setImg] = useState(data !== null ? JSON.parse(data).collegeHeader.img : '');

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
            actionFunc({
                collegeHeader:{
                    collegeId: collegeId !== null ? collegeId : 0,
                    title: title,
                    img: img
                },
                collegeDescription:{
                    description: description,
                    grade: data != null ? JSON.parse(data).collegeDescription.grade : 0,
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

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
      
        reader.onloadend = () => {
          const byteString = reader.result;
          setImg(byteString);
        };
      
        reader.readAsDataURL(file);
      };

    //   const handleFileUpload = (event) => {
    //     const file = event.target.files[0];
    //     const reader = new FileReader();
      
    //     reader.onload = (e) => {
    //       const img = new Image();
    //       img.src = e.target.result;
      
    //       img.onload = () => {
    //         const canvas = document.createElement('canvas');
    //         const ctx = canvas.getContext('2d');
      
    //         // Уменьшение размера изображения
    //         const maxWidth = 800;
    //         const maxHeight = 600;
    //         let width = img.width;
    //         let height = img.height;
      
    //         if (width > height) {
    //           if (width > maxWidth) {
    //             height *= maxWidth / width;
    //             width = maxWidth;
    //           }
    //         } else {
    //           if (height > maxHeight) {
    //             width *= maxHeight / height;
    //             height = maxHeight;
    //           }
    //         }
      
    //         canvas.width = width;
    //         canvas.height = height;
      
    //         // Отрисовка уменьшенного изображения на холсте
    //         ctx.drawImage(img, 0, 0, width, height);
      
    //         // Получение уменьшенного изображения в формате JPEG с заданным качеством
    //         const reducedImageData = canvas.toDataURL('image/jpeg', 0.5);
      
    //         // Преобразование в байт-строку
    //         const byteString = atob(reducedImageData.split(',')[1]);

    //         setImg(byteString);
      
    //         console.log(byteString);
    //       };
    //     };
      
    //     reader.readAsDataURL(file);
    //   };
      
      console.log(img);

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
                            {/* <div className={style.InputBox}> */}
                                <label className={style.InputFile}>
                                    <input type='file' onChange={handleFileUpload}></input>
                                    <p className={style.Button}>Открыть</p>           
                                </label>
                                {/* <p className={style.InputButton}>Открыть</p> */}
                            {/* </div> */}
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