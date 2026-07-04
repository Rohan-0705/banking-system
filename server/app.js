const express = require("express");
const cookieParser = require("cookie-parser");
const kycRoutes = require("./routes/kyc.routes");

const transactionRoutes = require("./routes/transaction.routes");
const app = express();
app.use(express.json());
app.use(cookieParser());

const authRoutes = require("./routes/auth.routes");

app.use("/api/auth", authRoutes);
app.use("/api/kyc", kycRoutes);
app.use("/api/transactions", transactionRoutes);

module.exports = app;