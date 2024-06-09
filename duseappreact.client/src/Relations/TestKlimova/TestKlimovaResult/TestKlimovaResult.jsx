import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import style from './TestKlimovaResult.module.css';
//
import {QuestionRespoce} from '../Data.js';
import {getCollegesBySpecialtyKeys} from '../../../services/Colleges.js';
import ExceptionState from '../../../services/ApplicationException.js';
import SpecialtyPanel from '../../../components/SpecialtyPanel/SpecialtyPanel.jsx';


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

    console.log(colleges);


    return (
        <div className={style.MainBox}>
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
            <div>
                <table className={style.CollegeTable}>
                    <tbody>
                    {colleges !== null && Array.isArray(colleges) &&
                        colleges.map((college, index) => (
                        <tr key={index}>
                            <td>{college.collegeHeader.title}</td>
                            <td>
                                <SpecialtyPanel actionClick={null} speсialtyList={college.specialtyList.map((specialty) => specialty.title)}/>
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

