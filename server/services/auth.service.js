const User = require("../models/User.model");

const findUser = async (payload, success, fail) => {
    await User.findOne({payload})
        .then(user => success(user))
        .catch(error => fail(error.message))
}

const saveUser = async (payload,success,fail)=>{
    const user = await new User({payload})
    if (user){
        success(user)
    }else {
        fail("Error occurred")
    }
}

module.exports = {saveUser,findUser}