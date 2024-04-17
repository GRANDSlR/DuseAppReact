
export const Colleges = (colleges) => {
    return (
        <div className="Cards">
            {colleges.map(college => 
                <div className="CollegeCard" id={college.collegeHeader.collegeId}>
                    <span>{college.collegeHeader.collegeId}</span>
                    <span>{college.collegeHeader.title}</span>
                </div>
            )}
        </div>
    );
}