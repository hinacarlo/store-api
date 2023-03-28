const asyncHandler = require("express-async-handler");

const getAllProductsStatic = asyncHandler(async (req, res) => {
  throw new Error("Testing async errors");
  res.status(200).json({ message: "products testing route" });
});

const getAllProducts = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "products route" });
});

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
