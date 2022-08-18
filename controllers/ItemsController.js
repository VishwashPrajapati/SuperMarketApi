const Category = require("../models/categoryModel");
var mongoose = require("mongoose");
const Items = require("../models/ItemsModel");
const Supermarket = require("../models/SupermarketModel");

exports.CreateItems = async (req, res, next) => {
  let category = await Category.findById(req.body.catID);

  const item = await Items.create({
    name: req.body.name,
    category: category._id,
    price: 0,
    active: true,
  });

  let ids = [];
  let allmarket = await Supermarket.find();
  allmarket.forEach((x) => {
    ids.push(x._id);
  });

  await Supermarket.updateMany(
    {
      _id: { $in: ids },
    },
    {
      $push: { items: item._id },
    },
    { multi: true }
  );

  return res.json({
    Data: item,
    message: "Item Created",
  });
};

exports.getAllItems = async (req, res, next) => {
  let items = await Items.find().populate("category", "name");
  return res.json({
    Data: items,
    message: "respond with a resource",
  });
};

exports.getItems = async (req, res, next) => {
  let items = await Items.findById(req.params.id).populate("category", "name");
  return res.json({
    Data: items,
    message: "Successfully.....!",
  });
};

exports.deleteItems = async (req, res, next) => {
  let items = await Items.findByIdAndDelete(req.params.id);

  let ids = [];

  let allmarket = await Supermarket.find();

  allmarket.forEach((x) => {
    let id = x.items.findIndex((e) => e === req.params.id);
    console.log(id);
    if (id === -1) {
      ids.push(x._id);
    }
  });

  await Supermarket.updateMany(
    {
      _id: { $in: ids },
    },
    {
      $pull: { items: mongoose.Types.ObjectId(req.params.id) },
    }
  );
  return res.json({
    Data: "items",
    message: "Deleted Successfully.....!",
  });
};
