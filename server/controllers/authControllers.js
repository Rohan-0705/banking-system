const { registerUserService } = require("../services/authServices");

const registerUser = async (req, res) => {
    try{
        const response = await registerUserService(req.body);
        return res.status(201).json(response);
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

module.exports = {
    registerUser,
}