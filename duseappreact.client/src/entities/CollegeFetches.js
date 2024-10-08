
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

export const updateGrade = async (id, grade) => {

    try {
        const response = await fetch(`/college/updategrade/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(grade)
        });
    
        if (!response.ok) {
          throw new Error('College grade update request failed');
        }
    
        const data = await response.json();
    
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
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
    try {
      const response = await fetch('/college', {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(collegeRequest)
    });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
};

export const updateCollege = async (id, collegeRequest) => {

    try {
        const response = await fetch(`/college/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(collegeRequest)
        });
    
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }
    
        const data = await response.json();
    
        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    // await fetch(`/college/${id}`, {
    //     method: "PUT",
    //     headers: {
    //         "content-type": "application/json"
    //     },
    //     body: JSON.stringify(collegeRequest)
    // });
};

export const deleteCollege = async (id) => {
  try {
    const response = await fetch(`/college/${id}`, {
        method: "DELETE"
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCollegesBySpecialtyKeys = async (keys) => {
  try {
    const response = await fetch(`/college/getcollegesbyspecialtykeys`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(keys)
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  };
};