import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import style from './TestKlimovaResult.module.css';
import { NavLink } from 'react-router-dom';
//
import {QuestionRespoce} from '../Data.js';
import {getCollegesBySpecialtyKeys} from '../../../services/Colleges.js';
import ExceptionState from '../../../services/ApplicationException.js';
import SpecialtyPanel from '../../../components/SpecialtyPanel/SpecialtyPanel.jsx';
import currCollegeData from '../../../services/CollegeGlobalStates.js';



const TestKlimovaResult = ({data}) => {

    const [colleges, setColleges] = useState(null);

    const calculateResults = (title) => {

        const valueArrayByTitle = QuestionRespoce.find(item => item.title === title)?.values;

        let counter = 0;

        valueArrayByTitle.forEach(element => {
            if(data[element] === 1)
                counter++;
        });

        return {title: title, value: counter};
    }

    const getMaxCalculateResults = () => {

        let resultArray = []

        QuestionRespoce.forEach(element => {
            resultArray.push(calculateResults(element.title));
        });

        resultArray.sort((a, b) => b.value - a.value);

        return [resultArray[0].title, resultArray[1].title];
    }

    const getCollegeData = async() => {

        await getCollegesBySpecialtyKeys({keys: getMaxCalculateResults()})
        .then(collegeArray => {
            setColleges(collegeArray);
        })
        .catch(error => {
            ExceptionState.setException(true, "Невозможно получить данные. " +`${error}`);
            console.error('Failed to update user:', error);
        });
    }

    useEffect(() => {
        if(colleges === null)
            getCollegeData();
    }, [colleges])

    const getRelevantSpecialtyNames = (specialtyList) => {

        const appropriateSpecialtyList = specialtyList.filter(specialty => getMaxCalculateResults().some(element => specialty.description.includes(element)));

        return appropriateSpecialtyList.map((specialty) => specialty.title)
    }

    return (
        <div className={style.MainBox}>
            <p className={style.Annotation}>Наибольшее количество баллов указывает на наиболее подходящий вам тип профессии: природа, техника, знак, 
                искусство, человек.
            </p>
            <div className={style.TableBox}>
                <table className={style.ResultTable}>
                    <tbody>
                        {Array.isArray(QuestionRespoce) && QuestionRespoce.map((item, index) => 
                            <tr key={index}>
                                <td><p>{item.title}</p></td>
                                <td className={style.ProgressBox}>
                                    <ProgressBar isLabelVisible={false} completed={calculateResults(item.title).value} maxCompleted={QuestionRespoce.length}  width='100%' height="25px"  bgColor={'#799FFF'} borderRadius={'0px'} baseBgColor={'transparent'} />
                                </td>
                                <td><p>{calculateResults(item.title).value}</p></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <p className={style.Annotation}>4-5 баллов – выраженный интерес, 2-3 – умеренный интерес; 0-1 – отсутствие интереса.
                 Методика, которую вы только что выполнили, основана на ваших профессиональных интересах. 
                 Все значительные профессиональные достижения выросли из интересов, которые при благоприятных 
                 условиях развились в склонности.
            </p>
            <div className={style.TableBox}>
            
                <table className={style.CollegeTable}>
                    <tbody>
                        <tr>
                            <th>Название</th>
                            <th>Подходящие специальности</th>
                        </tr>
                    {colleges !== null && Array.isArray(colleges) &&
                        colleges.map((college, index) => (
                        <tr key={index}>
                            <td className={style.CollegeHeader}>
                                <NavLink to={'/page'}  className={style.Title} onClick={() => currCollegeData.setData(college)}>
                                        {college.collegeHeader.title}
                                </NavLink>
                                {/* <p className={style.Title}>{college.collegeHeader.title}</p> */}
                                <p>{college.collegeLocation.region}</p>
                            </td>
                            <td>
                                <SpecialtyPanel actionClick={null} speсialtyList={getRelevantSpecialtyNames(college.specialtyList)}/>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TestKlimovaResult;

