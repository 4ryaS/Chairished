const mongoose = require('mongoose');
const { Schema } = mongoose;
const { connectDB } = require('../database/database');
const connection = connectDB();

const categorySchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
}, { timestamps: true });

const categoryModel = connection.useDb(process.env.DEFAULT_DB).model('category', categorySchema, 'category');
module.exports = categoryModel;
