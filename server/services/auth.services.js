const User = require("../models/user");
const bcrypt = require("bcrypt");
const {generateAccessToken, generateRefreshToken} =require("../utils/generateToken");

const registerUserService = async (user) => {

    const {
        firstName,
        lastName,
        dateOfBirth,
        email,
        phone,
        password,
        address
    } = user;

    if (
        !firstName ||
        !lastName ||
        !dateOfBirth ||
        !email ||
        !phone ||
        !password ||
        !address
    ) {
        return {
            success: false,
            message: "All fields are required.",
        };
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return {
            success: false,
            message: "Email already registered."

        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
        firstName,
        lastName,
        dateOfBirth,
        email,
        phone,
        password: hashedPassword,
        address,
    })

    return {
        success: true,
        message: "User registered successfully.",
        data: createdUser,
    };
}

const loginUserService = async ({ email, password }) => {
    if (!email || !password) {
        return {
            success: false,
            message: "Email and password are required.",
        };
    }

    const user = await User.findOne({ email });

    if (!user) {
        return {
            success: false,
            message: "Invalid email or password.",
        };
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        return {
            success: false,
            message: "Invalid email or password.",
        };
    }
    const accessToken = generateAccessToken(user._id);

    const refreshToken = generateRefreshToken(user._id);

     const userData = user.toObject();
     delete userData.password;
     
    return {
        success: true,
        message: "Login successful.",
        user: userData,
        accessToken,
        refreshToken,
    };
}

module.exports = {
    registerUserService,
    loginUserService,
}