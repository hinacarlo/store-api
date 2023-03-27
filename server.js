const express = require("express");
require("dotenv").config();
const app = express();

const connectDB = require("./db/dbConn");
const notFound = require("./middleware/404");
const errorHandler = require("./middleware/error-handler");
const productsRoute = require("./routes/products.router");

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use("/api/v1/products", productsRoute);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
