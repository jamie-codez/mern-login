const User = require("../models/User.model");
const {getResponse} = require("../utils/tools.utils");
const {saveUser, findUser} = require("../services/auth.service");
const {hash, genSalt, compare} = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");

const register = async (req, res) => {
    const {username, email, password} = req.body;
    if (!username || !email || !password)
        return res.status(400).statusMessage("Bad Request").contentType("application/json").json(getResponse(400, "Please fill all the fields", {}))
    await findUser({email: email}, (user) => {
        if (user) {
            return res.status(409).statusMessage("Conflict").contentType("application/json").json(getResponse(409, "User already exists", {}));
        } else {
            const encodedPass = hash(password, genSalt(10));
            saveUser({username, email, encodedPass}, (user) => {
                res.status(201).statusMessage("Created").contentType("application/json").json(getResponse(201, "User created successfully", {
                    ...user,
                    password
                }))
            }, (error) => {
                console.error(`ERROR: ${error.message}`.bgRed);
                res.status(500).statusMessage("Internal server error").contentType("application/json").json(getResponse(500, "Error occurred try again", {}))
            });
        }
    }, (error) => {
        console.error(`ERROR: ${error.message}`.bgRed)
        res.status(500).statusMessage("Internal server error").contentType("application/json").json(getResponse(500, "Error occurred try again", {}))
    });
}

const login = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password)
        return res.status(400).statusMessage("Bad Request").contentType("application/json").json(getResponse(400, "Please fill all fields", {}))
    await findUser({email}, async (user) => {
        if (!user)
            return res.status(404).statusCode("Not found").contentType("application/json").json(getResponse(404, "User not found", {}));
        const passwordMatches = await compare(password, user.password);
        if (!passwordMatches)
            return res.status(401).statusMessage("Forbidden").contentType("application/json").json(getResponse(401, "Invalid credentials", {}))
        res.statusCode(200).statusMessage("OK").contentType("application/json").json(getResponse(200, "Login successful", generateTokens(user.email)));
    }, (error) => {
        console.error(`ERROR: ${error.message}`)
        res.status(500).statusMessage("Internal Server error").contentType("application/json").json(getResponse(500, "Error occurred try again", {}))
    })
}

const generateTokens = (payload) => {
    return {access_token: jsonWebToken.sign(payload, process.env.JWT_SECRET)}
}


module.exports = {register}