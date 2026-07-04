const { registerUserService, loginUserService} = require("../services/auth.services");

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

const loginUser = async (req,res) => {
    try{

         console.log("Request Body:", req.body);
        const response = await loginUserService(req.body);

        if(!response.success){
            return res.status(400).json(response);
        }

        res.cookie("refreshToken",response.refreshToken, {
            httpOnly : true,
            secure:false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        return res.status(200).json({
            success: true,
            message: response.message,
            accessToken: response.accessToken,
            user: response.user,
        });
    }
    catch(error){
         return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

const logoutUser = (req,res) => {
    res.clearCookie("refreshToken");

     return res.json({
        success: true,
        message: "Logout successful."
    });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
}