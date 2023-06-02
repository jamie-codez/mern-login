const User = require("../models/User.model");
const {getResponse} = require("../utils/tools.utils");

const register = async (req, res) => {
    const {username,email,password} = req.body;
    if (!username || !email || !password)
        return res.status(400).statusMessage("Bad Request").contentType("application/json").json(getResponse(400,"Please fill all the fields",{}))
}


module.exports = {register}