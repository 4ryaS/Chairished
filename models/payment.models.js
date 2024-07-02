const mongoose = require('mongoose');
const { Schema } = mongoose;
const { connectDB } = require('../database/database');
const connection = connectDB();

const paymentSchema = mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    amount: { type: Number, required: true },
    paymentDate: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    // Add other payment-related fields as needed
}, { timestamps: true });

const paymentModel = connection.useDb(process.env.DEFAULT_DB).model('payment', paymentSchema, 'payment');
module.exports = paymentModel;
