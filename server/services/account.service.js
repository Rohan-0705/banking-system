const Account = require("../models/account.model");
const generateAccountNumber = require("../utils/generateAccountNumber");

const createAccountsService = async (userId) => {

    const checking = await Account.create({

        user: userId,

        accountNumber: generateAccountNumber(),

        type: "CHECKING",

    });

    const savings = await Account.create({

        user: userId,

        accountNumber: generateAccountNumber(),

        type: "SAVINGS",

    });

    return {
        checking,
        savings,
    };
};

module.exports = {
    createAccountsService,
};