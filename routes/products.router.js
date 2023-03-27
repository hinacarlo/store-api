const express = require("express");
const {
  getAllProducts,
  getAllProductsStatic,
} = require("../controllers/products.controller");

const productsRoute = express.Router();

productsRoute.route("/").get(getAllProducts);
productsRoute.route("/static").get(getAllProductsStatic);

module.exports = productsRoute;
