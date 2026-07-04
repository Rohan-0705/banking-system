const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/auth.controller");
const protect = require("../middlewares/auth.middlewares")

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, (req,res) => {
    return res.json({
        success:true,
        user:req.user,
    })
})
router.post("/logout", logoutUser);

module.exports = router;