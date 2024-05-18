
export const register = async (userRegisterRequest) => {
    return await fetch('/user/register', {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(userRegisterRequest)
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
};