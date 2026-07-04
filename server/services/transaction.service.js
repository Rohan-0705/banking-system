const Account = require("../models/account.model");
const Transaction = require("../models/transaction.model");

const depositService = async (
    accountId,
    amount
)=>{
    if(amount < 1 || amount > 50000){

        return{
            success:false,
            message:"Deposit amount should be between $1 and $50,000"
        };

    }

    const account = await Account.findById(accountId);

    if(!account){

        return{
            success:false,
            message:"Account not found"
        };

    }

    if(account.status !== "ACTIVE"){

        return{
            success:false,
            message:"Account is not active"
        };

    }

    account.balance += amount;

    await account.save();

    await Transaction.create({

        account:account._id,

        type:"DEPOSIT",

        amount,

        balanceAfter:account.balance,

        description:"Cash Deposit"

    });

    return{

        success:true,

        message:"Deposit successful",

        balance:account.balance

    };

};

module.exports={
    depositService
};