const express = require("express");
require("dotenv").config({ path: "../.env" });
const connectDB = require("./config/db.js");

connectDB();
const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

//----------------------------------------------------------------------------------------------------------------------

//MIDDLEWARES
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//----------------------------------------------------------------------------------------------------------------------

app.listen(5000, () => console.log(`Server started on port ${port}`));
