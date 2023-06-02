const router = require("express").Router();
const {register,login,logout} = require("../controllers/auth.controller");

router.post("/register", async (req, res) => {
    await register(req,res);
});
router.post("/login", async (req, res) => {
    await login(req, res);
});

router.post("/logout", async (req, res) => {
    await logout(req,res);
});

module.exports = router;