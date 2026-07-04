const { depositService } = require("../services/transaction.service");

const deposit = async(req,res)=>{

    try{

        const response = await depositService(

            req.params.accountId,

            req.body.amount

        );

        return res.json(response);

    }
    catch(error){

        return res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

module.exports={
    deposit
};