const express = require("express");

const protect = require("../middlewares/auth.middleware");

const { deposit } = require("../controllers/transaction.controller");

const router = express.Router();

router.post(
    "/deposit/:accountId",
    protect,
    deposit
);

module.exports = router;