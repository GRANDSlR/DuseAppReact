import React from 'react'

export const Colleges = ({collegeObjects}) => {
    return (
        <div className="Cards">
            {collegeObjects.map((college, index) => 
                <div className="CollegeCard" id={college.collegeHeader.collegeId} key={index}>
                    <span>{college.collegeHeader.collegeId}</span>
                    <span>{college.collegeHeader.title}</span>
                </div>
            )}
        </div>
    );
}