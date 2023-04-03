const Product = require("../models/products.model");
const asyncHandler = require("express-async-handler");

const getAllProductsStatic = asyncHandler(async (req, res) => {
  const products = await Product.find({ price: { $gt: 30 } })
    .sort("price")
    .select("name price");
  res.status(200).json({ length: products.length, products });
});

const getAllProducts = asyncHandler(async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObj = {};

  if (featured) {
    queryObj.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObj.company = company;
  }

  if (name) {
    queryObj.name = { $regex: name, $options: "i" };
  }

  if (numericFilters) {
    const operators = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|<=|>=|=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operators[match]}-`
    );

    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObj[field] = { [operator]: +value };
      }
    });
  }

  console.log(queryObj);

  let result = Product.find(queryObj);
  if (sort) {
    const sortBy = sort.split(",").join(" ");
    result = result.sort(sortBy);
  } else {
    result = result.sort("createdAt");
  }

  if (fields) {
    const fieldStr = fields.split(",").join(" ");
    result = result.select(fieldStr);
  }

  // pagination
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ length: products.length, products });
});

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
