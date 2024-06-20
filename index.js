const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const register = require("./routes/register");
const login = require("./routes/login");
const stripe = require("./routes/stripe");
const productsRouter = require("./routes/products");

const products = require("./models/product");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/stripe", stripe);
app.use("/api/products", productsRouter);

app.get("/products",(req,res)=>{
  res.send(products);
});
const port = process.env.PORT || 5000;
const uri = process.env.DB_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection successful..."))
  .catch((err) => console.error("MongoDB connection failed:", err.message));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
