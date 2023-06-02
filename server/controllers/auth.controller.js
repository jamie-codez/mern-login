const User = require("../models/User.model");
const {getResponse, generateTokens} = require("../utils/tools.utils");
const {saveUser, findUser} = require("../services/auth.service");
const {hash, genSalt, compare} = require("bcrypt");

const register = async (req, res) => {
    const {username, email, password} = req.body;
    if (!username || !email || !password)
        return res.status(400).statusMessage("Bad Request").contentType("application/json").json(getResponse(400, "Please fill all the fields", {}))
    await findUser({email: email}, (user) => {
        if (user) {
            res.statusMessage = "Conflict"
            return res.status(409).contentType("application/json").json(getResponse(409, "User already exists", {}));
        } else {
            const encodedPass = hash(password, genSalt(10));
            saveUser({username, email, encodedPass}, (user) => {
                res.statusMessage = "Created"
                res.status(201).contentType("application/json").json(getResponse(201, "User created successfully", {
                    ...user,
                    password
                }))
            }, (error) => {
                console.error(`ERROR: ${error.message}`.bgRed);
                res.statusMessage = "Internal server error"
                res.status(500).contentType("application/json").json(getResponse(500, "Error occurred try again", {}))
            });
        }
    }, (error) => {
        console.error(`ERROR: ${error.message}`.bgRed)
        res.statusMessage = "Internal server error"
        res.status(500).contentType("application/json").json(getResponse(500, "Error occurred try again", {}))
    });
}

const login = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.statusMessage = "Bad Request"
        return res.status(400).contentType("application/json").json(getResponse(400, "Please fill all fields", {}))
    }
    await findUser({email}, async (user) => {
        if (!user) {
            res.statusMessage = "Not found"
            return res.status(404).contentType("application/json").json(getResponse(404, "User not found", {}));
        }
        const passwordMatches = await compare(password, user.password);
        if (!passwordMatches) {
            res.statusMessage = "Forbidden"
            return res.status(401).contentType("application/json").json(getResponse(401, "Invalid credentials", {}))
        }
        res.statusMessage = "OK"
        res.status(200).contentType("application/json").json(getResponse(200, "Login successful", generateTokens(user.email)));
    }, (error) => {
        console.error(`ERROR: ${error.message}`)
        res.statusMessage = "Internal Server error"
        res.status(500).contentType("application/json").json(getResponse(500, `Error occurred try again. -> ${error.message}`, {}))
    });
}

const logout = async (req, res) => {
    res.statusMessage = "OK"
    res.status(200).contentType("application/json").json(getResponse(200, "Logout successful", {}))
}


module.exports = {register, login, logout}