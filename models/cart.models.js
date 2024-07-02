const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
  items: [{
    productId: { type: Schema.Types.ObjectId, ref: 'furniture', required: true },
    quantity: { type: Number, required: true, default: 1 },
  }],
}, { timestamps: true });

const cartModel = connection.useDb(process.env.DEFAULT_DB).model("cart", cartSchema, "cart");
module.exports = cartModel;
