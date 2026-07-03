const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true
        },
        lastName:{
            type:String,
            required:true,
        },
        dateOfBirth:{
            type:Date,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        phone:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            enum:["Customer", "Admin"],
            default:"Customer"
        },
        address:{
            street:String,
            city:String,
            state:String,
            pinCode:String,
            country:String
        }
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.connect("User",userSchema);