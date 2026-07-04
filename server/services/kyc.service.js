const KYC = require("../models/kyc.model");
const { createAccountsService } = require("./account.service");

const submitKYCService = async (userId, body, file) => {
    const { applicationName } = body;

    if (!applicationName || !file) {
        return {
            success: false,
            message: "Application name and ID proof are required."
        };
    }

    const existingKYC = await KYC.findOne({ user: userId });

    if (existingKYC && existingKYC.status !== "DECLINED") {
        return {
            success: false,
            message: "You already have an active KYC application."
        };
    }

    const { extractText } = require("../utils/ocr");
    const { compareNames } = require("../utils/nameMatcher");

    const extractedText = await extractText(file.path);
    const extractedProofName = extractedText;

    const similarityScore = compareNames(
        applicationName,
        extractedProofName
    );

    let status = "DECLINED";
    let declineReason = "";

    if (similarityScore >= 0.85) {
        status = "APPROVED";
    } else {
        declineReason = `Name on proof (${extractedProofName}) does not match application name (${applicationName})`;
    }

    if (status === "APPROVED") {

        await createAccountsService(userId);

    }

    const kyc = await KYC.create({

        user: userId,

        applicationName,

        extractedProofName,

        similarityScore,

        declineReason,

        status,

        idProof: file.path,

    });

    return {
        success: true,
        message: "KYC submitted successfully.",
        data: kyc
    };



}

module.exports = {
    submitKYCService,
};