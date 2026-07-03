// const User = require("../models/user");

const registerUserService = async (user) => {
    return {
        sucess:true,
        message: "Registration service working",
        data:user,
    };
}

module.exports = {
    registerUserService,
}