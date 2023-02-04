const express = require("express");
require("dotenv").config({ path: "../.env" });
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoute.js");

connectDB();
const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

//----------------------------------------------------------------------------------------------------------------------

//MIDDLEWARES
app.use("/api/user", userRoutes);
// app.use("/api/order", orderRoutes);
// app.use("/api/product", productRoutes);
// app.use("/api/cart", cartRoutes);

//----------------------------------------------------------------------------------------------------------------------

app.listen(5000, () => console.log(`Server started on port ${port}`));
