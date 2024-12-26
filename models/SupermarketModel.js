const mongoose = require("mongoose");
const ItemsModel = require("./ItemsModel");
const jwt = require("jsonwebtoken");

const supermarketSchema = mongoose.Schema({
  name: { type: String, require: true },
  items: [
    {
      name: String,
      price: Number,
      active: Boolean
    }
  ],
  password: { type: String },
  active: { type: Boolean },
  role: { type: String, enum: ["user", "admin"], default: "user" }
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.token = await bcrypt.hash(this.token, salt);
  next();
});


module.exports = mongoose.model("Supermarket", supermarketSchema);
