const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
{
    account:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Account",
        required:true
    },

    type:{
        type:String,
        enum:[
            "DEPOSIT",
            "WITHDRAWAL",
            "TRANSFER_IN",
            "TRANSFER_OUT"
        ],
        required:true
    },

    amount:{
        type:Number,
        required:true
    },

    balanceAfter:{
        type:Number,
        required:true
    },

    description:{
        type:String,
        default:""
    }

},
{
    timestamps:true
}
);

module.exports = mongoose.model(
    "Transaction",
    transactionSchema
);