const { submitKYCService } = require("../services/kyc.service");

const submitKYC = async (req, res) => {
    try {

        const response = await submitKYCService(
            req.user._id,
            req.body,
            req.file
        );

        return res.status(201).json(response);

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

module.exports = {
    submitKYC,
};