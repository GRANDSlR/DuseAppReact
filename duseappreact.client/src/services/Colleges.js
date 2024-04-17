
export const getAllColleges = async () => {
    const response = await fetch('https://localhost:5173/college');
    return await response.json();
};

export const createCollege = async (collegeRequest) => {
    await fetch('https://localhost:5173/college', {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(collegeRequest)
    });
};

export const updateCollege = async (id, collegeRequest) => {
    await fetch('https://localhost:5173/college/${id}', {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(collegeRequest)
    });
};

export const deleteCollege = async (id) => {
    await fetch('https://localhost:5173/college/${id}', {
        method: "DELETE"
    });
};