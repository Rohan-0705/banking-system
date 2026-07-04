const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req,res,next) => {
    try{
        let token;

        if(req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ){
            token = req.headers.authorization.split(" ")[1];
        }
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Access token not found.",
            });
        }

        const decode = jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET
        );
        const user = await User.findById(decode.userId).select("-password");

        if(!user){
             return res.status(401).json({
                success: false,
                message: "User not found.",
            });
        }
        req.user = user;

        next();
    }catch(error){
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token.",
        });
    }
} 

module.exports = protect;