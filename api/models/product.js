const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
  card_number: String,
  pin: String,
  balance: String,
  date: { type: Date, default: Date.now },
  is_active: { type: Boolean, default: true }
});
module.exports = mongoose.model("Card", cardSchema);
