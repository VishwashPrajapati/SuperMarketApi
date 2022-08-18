const mongoose = require("mongoose");

const supermarketSchema = mongoose.Schema({
  name: { type: String, require: true },
  items: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Items",
    },
  ],
  active: { type: Boolean },
});

module.exports = mongoose.model("Supermarket", supermarketSchema);
