const userModel = require('../models/user.models');

class UserRepository {
    create = async (name, email, hash, phoneNum) => {
        return await userModel.create({
            name: name,
            email: email,
            password: hash,
            phoneNum: phoneNum
        });
    };

    findByUsername = async (username) => {
        return await userModel.findOne({username: username});
    };

    findByEmail = async (email) => {
        return await userModel.findOne({email: email});
    };

    findByIdandUpdate = async (req, id) => {
        let { username, name, profile, department, phoneNum, age, salary, workExp } = req.body;
        return await userModel.findOneAndUpdate({ _id: id }, { name, profile, department, phoneNum, age, salary, workExp }, { new: true });
    };

    findByIdAndDelete = async (id) => {
        return await userModel.findOneAndDelete({ _id: id });
    }

    // Other methods as required
};

module.exports = new UserRepository();