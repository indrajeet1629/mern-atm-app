const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
  card_number: Number,
  pin: Number,
  balance: Number,
  date: { type: Date, default: Date.now },
  is_active: { type: Boolean, default: true }
});
module.exports = mongoose.model("Card", cardSchema);
