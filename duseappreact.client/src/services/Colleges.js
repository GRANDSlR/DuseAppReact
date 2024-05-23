
export const getCollegesByFilterParams = async (filterRequest) => {

    return await fetch('/college/getcollegesbyfilterparams', {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(filterRequest)
    })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
}


export const getAllSpecialties = async () =>{
    const response = await fetch('/college/getallspecialties');
    return await response.json();
}

export const getCollegesByTitle = async (title) => {

    const response = await fetch('/college/getcollegesbytitle/?title='+title);
    return await response.json();
};

export const createCollege = async (collegeRequest) => {
    await fetch('/college', {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(collegeRequest)
    });
};

export const updateCollege = async (id, collegeRequest) => {
    await fetch(`/college/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(collegeRequest)
    });
};

export const deleteCollege = async (id) => {
    await fetch(`/college/${id}`, {
        method: "DELETE"
    });
};