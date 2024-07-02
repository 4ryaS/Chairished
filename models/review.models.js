const mongoose = require('mongoose');
const { Schema } = mongoose;
const { connectDB } = require('../database/database');
const connection = connectDB();

const reviewSchema = mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    furniture: { type: Schema.Types.ObjectId, ref: 'Furniture', required: true },
    rating: { type: Number, required: true },
    comment: { type: String },
}, { timestamps: true });

const reviewModel = connection.useDb(process.env.DEFAULT_DB).model('review', reviewSchema, 'review');
module.exports = reviewModel;
