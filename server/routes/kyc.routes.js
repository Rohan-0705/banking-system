const express = require("express");

const protect = require("../middlewares/auth.middlewares");
const upload = require("../middlewares/upload.middleware");

const {
    submitKYC,
} = require("../controllers/kyc.controllers");

const router = express.Router();

router.post(
    "/submit",
    protect,
    upload.single("idProof"),
    submitKYC
);

module.exports = router;    