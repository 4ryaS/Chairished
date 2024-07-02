const mongoose = require('mongoose');
const { Schema } = mongoose;
const { connectDB } = require('../database/database');
const connection = connectDB();

const bookingSchema = mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    furniture: { type: Schema.Types.ObjectId, ref: 'Furniture', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
    // Add other fields as needed for booking
}, { timestamps: true });

const bookingModel = connection.useDb(process.env.DEFAULT_DB).model("booking", bookingSchema, "booking");
module.exports = bookingModel;
