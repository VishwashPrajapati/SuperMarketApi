const mongoose = require("mongoose");
const ItemsModel = require("./ItemsModel");

const supermarketSchema = mongoose.Schema({
  name: { type: String, require: true },
  items: [
    {
      name: String,
      price: Number,
      category: string,
      active: Boolean,
    },
  ],
  active: { type: Boolean },
});

module.exports = mongoose.model("Supermarket", supermarketSchema);
