const User = require("../models/User.model");

const findUser = async (payload, success, fail) => {
    await User.findOne({payload})
        .then(async user => await success(user))
        .catch(async error => await fail(`Error occurred in finding -> ${error.message}`));
}

const saveUser = async (payload, success, fail) => {
    await User.create(payload)
        .then(async user => await success(user))
        .catch(async error => await fail(`Error occurred in saving -> ${error.message}`))
}

module.exports = {saveUser, findUser}