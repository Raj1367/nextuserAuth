

const backendUrl = "http://localhost:3000"

const backendApi = {

    userSignup: {
        url: `${backendUrl}/api/users/signup`,
        method: "post"
    },

    userSignin: {
        url: `${backendUrl}/api/users/login`,
        method: "post"
    },

    userVerify:{
        url:`${backendUrl}/api/users/verifyemail`,
        method:"post"
    },

    userInfo: {
        url: `${backendUrl}/api/users/userprofile`,
        method: "post"
    },

    userLogout: {
        url: `${backendUrl}/api/users/logout`,
        method: "get"
    }
}

export default backendApi