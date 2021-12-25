const User = require('../models/users');
const Role = require('../models/role');

const isValidRole = async(role = '') => {

    const roleExists = await Role.findOne({ role });

    if (!roleExists) {
        throw new Error(`The role ${role} is not registered in the database.`);
    }

}


const emailExists = async(email = '') => {

    const emailExists = await User.findOne({ email });

    if (emailExists) {
        throw new Error(`The email ${email} is already registered in the database.`);
    }


}

const userIdExists = async(id = '') => {

    const userExists = await User.findById(id);

    if (!userExists) {
        throw new Error(`User id ${id} does not exist.`);
    }


}


module.exports = {
    isValidRole,
    emailExists,
    userIdExists
}