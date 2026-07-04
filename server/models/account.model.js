const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        accountNumber: {
            type: String,
            unique: true,
            required: true,
        },

        type: {
            type: String,
            enum: ["CHECKING", "SAVINGS"],
            required: true,
        },

        balance: {
            type: Number,
            default: 0,
        },

        currency: {
            type: String,
            default: "USD",
        },

        status: {
            type: String,
            enum: ["ACTIVE", "FROZEN", "CLOSED"],
            default: "ACTIVE",
        },

        openedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Account", accountSchema);