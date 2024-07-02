const mongoose = require('mongoose');
const { Schema } = mongoose;
const { connectDB } = require('../database/database');
const connection = connectDB();


const sessionSchema = mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    accessToken: { type: String, unique: true, required: true },
    refreshToken: { type: String, unique: true, required: true },
    userAgent: { type: String },
    createdAt: { type: Date, default: Date.now },
    accessExpiresAt: { type: Date, required: true },
    refreshExpiresAt: { type: Date, required: true }
}, { timestamps: true });

module.exports = connection.useDb(process.env.DEFAULT_DB).model("session", sessionSchema, "session");