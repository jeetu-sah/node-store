const User = require('../models/Users')
const bcrypt = require("bcrypt");

/**
 * save user input data
 * **/
const addUser = async (userInput) => {
    const user = new User(userInput);
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    user.password = await bcrypt.hash(userInput.password, salt);
    await user.save();
    return user;
}


module.exports = {addUser} 