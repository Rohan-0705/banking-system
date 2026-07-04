const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },

        applicationName: {
            type: String,
            required: true,
        },

        extractedProofName: {
            type: String,
        },

        idProof: {
            type: String,
            required: true,
        },

        similarityScore: {
            type: Number,
            default: 0,
        },

        declineReason: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: [
                "PENDING",
                "UNDER_REVIEW",
                "APPROVED",
                "DECLINED",
            ],
            default: "PENDING",
        },

        adminNote: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("KYC", kycSchema);