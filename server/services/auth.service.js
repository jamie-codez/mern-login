const User = require("../models/User.model");

const findUser = async (payload, success, fail) => {
    const user = await User.findOne({payload});
    if (user) {
        success(user)
    } else {
        fail("Error occurred in finding")
    }
}

const saveUser = async (payload, success, fail) => {
    const user = new User({payload})
    await user.save()
    if (user) {
        success(user)
    } else {
        fail("Error occurred")
    }
}

module.exports = {saveUser, findUser}