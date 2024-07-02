const mongoose = require('mongoose');
const { Schema } = mongoose;
const { connectDB } = require('../database/database');
const connection = connectDB();

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNum: {type: String, required: true, unique: true}
  // Additional fields as needed (e.g., profile information, rental history)
}, { timestamps: true });

const userModel = connection.useDb(process.env.DEFAULT_DB).model("user", userSchema, "user");

// userModel.create({
//     name: "Raju",
//     email: "raju@raju.com",
//     password: "raju",
//     phoneNum: "raju"
// });

module.exports = userModel;