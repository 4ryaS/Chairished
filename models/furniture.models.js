const mongoose = require('mongoose');
const { Schema } = mongoose;
const { connectDB } = require('../database/database');
const connection = connectDB();

const furnitureSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    pricePerDay: { type: Number, required: true },
    availableQuantity: { type: Number, required: true },
    imageUrl: { type: String }, // Example for furniture item image URL
    // Add other fields as needed for furniture item
}, { timestamps: true });

const furnitureModel = connection.useDb(process.env.DEFAULT_DB).model("furniture", furnitureSchema, "furniture");
module.exports = furnitureModel;