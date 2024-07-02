const mongoose = require('mongoose');
const { Schema } = mongoose;
const { connectDB } = require('../database/database');
const connection = connectDB();

const addressSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    country: { type: String, default: 'India' }, // Default to Indian subcontinent
    isDefault: { type: Boolean, default: false }, // Whether this is the user's default address
}, { timestamps: true });

const addressModel = connection.useDb(process.env.DEFAULT_DB).model('address', addressSchema, 'address');
module.exports = addressModel;
