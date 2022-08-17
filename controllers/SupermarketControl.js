const Supermarket = require("../models/SupermarketModel");
const AppError = require("./AppError");
const catchAsync = require("./CatchAsync");

exports.addSupermarket = catchAsync(async (req, res, next) => {
  const findCat = await Supermarket.find({ name: req.body.name });
  if (!req.body.name) {
    return next(new AppError("Name should not be emplty...!", 404));
  }
  if (findCat.length !== 0) {
    return next(new AppError("SupermarketAlready Exist...!", 400));
  }
  const supermarketData = await Supermarket.create({
    name: req.body.name,
    items: [],
    active: req.body.active,
  });
  res.json({ data: supermarketData, message: "created" });
});

exports.getAllSupermarket = async (req, res, next) => {
  const SupermarketData = await Supermarket.find();
  res.json({
    Data: SupermarketData,
    message: "All SupermarketList...!",
  });
};

exports.getSupermarket = async (req, res, next) => {
  const SupermarketData = await Supermarket.findById(req.params.id);
  res.json({
    Data: SupermarketData,
    message: "Successfull..!",
  });
};

exports.deleteSupermarket = catchAsync(async (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("Please select valid category...!", 404));
  }
  await Supermarket.deleteOne({ _id: req.params.id });
  res.json({ message: "Supermarket Deleted...!" });
});

exports.editSupermarket = catchAsync(async (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("Please select valid category...!", 404));
  }
  await Supermarket.findByIdAndUpdate({ _id: req.params.id }, req.body);
  res.json({ message: "Supermarket Updated...!" });
});
