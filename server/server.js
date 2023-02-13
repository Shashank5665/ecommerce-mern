const express = require("express");
require("dotenv").config({ path: "../.env" });
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoute.js");
const verifyRoutes = require("./routes/verifyRoute.js");
const productRoutes = require("./routes/productRoute.js");
const cartRoutes = require("./routes/cartRoute.js");
const bodyParser = require("body-parser");
const orderRoutes = require("./routes/orderRoute.js");
// const cors = require("cors");

connectDB();
const app = express();
// app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 2700;

//----------------------------------------------------------------------------------------------------------------------

//MIDDLEWARES
app.use("/api/user", userRoutes);
app.use("/api/verify", verifyRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

//----------------------------------------------------------------------------------------------------------------------

app.listen(2700, () => console.log(`Server started on port ${port}`));
