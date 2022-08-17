const Category = require("../models/categoryModel");
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
  await Supermarket.findByIdAndUpdate(
    {
      _id: {
        $in: [
          mongoose.Types.ObjectId("62fd32af79e79d03bf60ed55"),
          mongoose.Types.ObjectId("62fd32b779e79d03bf60ed58"),
        ],
      },
    },
    {
      $push: { items: item._id },
    },
    { multi: true }
  );
  // allSupermarket.forEach((e) => {
  //   let exist = e.items.findIndex((item) => item !== category._id);
  //   if (exist === -1) {
  //   }
  // });

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
