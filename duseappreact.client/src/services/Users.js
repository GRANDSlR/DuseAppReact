
export const updateUser = async (id, userUpdateRescponce) => {
  try {
    const response = await fetch(`/user/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userUpdateRescponce)
    });

    if (!response.ok) {
      throw new Error('UpdateUser request failed');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserByToken = async (token) => {
  return await fetch('/user/getuserbytoken', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: token })
  })
  .then(response => response.json())
  .then(data => {
    return data;
  })
  .catch(error => {
    throw error;
  });
};

export const register = async (userRegisterRequest) => {
    return await fetch('/user/register', {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(userRegisterRequest)
    })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
};

export const login = async (userloginRequest) => {
    return await fetch('/user/login', {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(userloginRequest)
    })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
};