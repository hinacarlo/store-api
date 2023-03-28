require("dotenv").config();
const fs = require("fs");
const connectDB = require("./db/dbConn");
const Product = require("./models/products.model");

const productsJson = require("./products.json");

const startServer = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.create(productsJson);
    console.log("Success...");
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const products = JSON.parse(
  fs.readFileSync(`${__dirname}/products.json`, "utf-8")
);

console.log(products.length);

// OLD APPROACH
// const importData = async () => {
//   try {
//     await Product.create(products);
//     console.log("Data successfully loaded");
//   } catch (error) {
//     console.log(error);
//   }
//   process.exit();
// };

// const deleteData = async () => {
//   try {
//     await Product.deleteMany();
//     console.log("Data successfully deleted");
//   } catch (error) {
//     console.log(error);
//   }
//   process.exit();
// };

// if (process.argv[2] === "--import") {
//   importData();
// } else if (process.argv[2] === "--delete") {
//   deleteData();
// }

startServer();
