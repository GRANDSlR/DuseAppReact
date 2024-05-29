import React, {useState} from 'react'
import style from './CollegePanel.module.css';
//
import SpecialtyPanel from '../SpecialtyPanel/SpecialtyPanel.jsx';
//
import websitePin from './img/AdmitistrationPanel/websitePin.svg';
import locationPin from './img/AdmitistrationPanel/locationPin.svg';
//
import heartFull from './img/SaveButton/heartFull.svg';
import heartEmpty from './img/SaveButton/heartEmpty.svg';
//
import FullStar from './img/FullStar.png';
import EmptyStar from './img/EmptyStar.png';
import PartedStar from './img/PartedStar.png';
//
import GradePanel from '../GradePanel/GradePanel.jsx';

export const Colleges = ({collegeObjects}) => {

    const [savedCollegesArray, setSavedCollegesArray] = useState(
        sessionStorage.getItem('savedColleges') != null ?
        JSON.parse(sessionStorage.getItem('savedColleges')) : ['']);

    console.log(savedCollegesArray);

    const [isOpenGragePanel, setIsOpenGragePanel] = useState(null);
    
    const addToVaf = (college) => {
          
        if(savedCollegesArray.includes(`${JSON.stringify(college)}`))
        {
            const newSavedCollegesArray = savedCollegesArray.filter(item => JSON.parse(item).collegeHeader.collegeId != `${college.collegeHeader.collegeId}`)
            setSavedCollegesArray(newSavedCollegesArray);
            sessionStorage.setItem('savedColleges', JSON.stringify(newSavedCollegesArray));
        }
        else {
            savedCollegesArray.push(`${JSON.stringify(college)}`)
            setSavedCollegesArray([...savedCollegesArray])
            sessionStorage.setItem('savedColleges', JSON.stringify(savedCollegesArray));
        }
    }

    const getGradeItems = (grade) => {
        const gradeTail = Math.trunc(grade);
        const result = [];
      
        for (let i = 0; i < gradeTail; i++) {
          result.push(<img src={FullStar} />);
        }
      
        if (gradeTail !== 0) {
          result.push(<img src={PartedStar} />);
        }
      
        for (let i = 0; i < 4 - grade; i++) {
          result.push(<img src={EmptyStar} />);
        }
      
        return result;
      };    
      

    return (
        <div className={style.Cards}>
            {collegeObjects != null || (Array.isArray(collegeObjects) && collegeObjects.length>0) ? collegeObjects.map((college, index) => 
                <div className={style.CollegeCard} key={index}>

                    <p id={style.collegeTitle}>{college.collegeHeader.title}</p>
                    <p id={style.collegeLocationHeader}>{college.collegeLocation.region}</p>

                    <div className={style.StarPanel} onClick={() => setIsOpenGragePanel(index)}>
                        {getGradeItems(college.collegeDescription.grade)}
                        {isOpenGragePanel === index && (
                            <div className={style.GradePanelBox} onClick={() => setIsOpenGragePanel(null)}>
                                <GradePanel collegeId={college.collegeHeader.collegeId} onClick={() => setIsOpenGragePanel(null)}/>
                            </div>
                        )}
                    </div>

                    <SpecialtyPanel speсialtyList={college.specialtyList.map((item) => item.title)}/>
                    
                    <div className={style.AdministrationPanel}>
                        <div>
                            <img src={websitePin} />
                            <p>{college.collegeDescription.webSiteRef}</p>
                        </div>
                        <div>
                            <img src={locationPin} />
                            <p>{college.collegeLocation.region}</p>
                        </div>
                    </div>

                    <div className={savedCollegesArray.includes(`${JSON.stringify(college)}`) ? `${style.SaveButton} ${style.Empty} `: style.SaveButton} onClick={() => addToVaf(college)}>
                        <img src={savedCollegesArray.includes(`${JSON.stringify(college)}`) ? heartEmpty : heartFull} />
                        <p>{savedCollegesArray.includes(`${JSON.stringify(college)}`) ? 'Сохранено' : 'Сохранить'}</p>
                    </div>
                </div>
            ) : <div className={style.ReportMessage}><p>Совпадений не найдено</p></div>}
        </div>
    );
}