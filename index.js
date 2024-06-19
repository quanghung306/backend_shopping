const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const register = require("./routes/register");
const login = require("./routes/login");
const product = require("./models/product");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use("/api/register", register);
app.use("/api/login", login);

app.get("/product",(req,res)=>{
  res.send(product);
});
const port = process.env.PORT || 5000;
const uri = process.env.DB_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection successful.."))
  .catch((err) => console.error("MongoDB connection failed:", err.message));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
