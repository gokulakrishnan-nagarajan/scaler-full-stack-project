const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const userRouter = require("./routes/user");
const productsRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const wishlistRouter = require("./routes/wishlist");
const orderRouter = require("./routes/order");

dotenv.config();

const app = express();
const PORT = process.env.port || 8080;
const dbUrl = process.env.dbUrl;

mongoose
    .connect(dbUrl)
    .then(() => {
        console.log("MongoDB - Connection successful");
    })
    .catch(() => {
        console.log("MongoDB - Connection failed");
    });

//
// Express middlewares
//

app.use(express.json());
app.use(cors());

//
// Express routers
//

app.use("/api/user", userRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/wishlist", wishlistRouter);
app.use("/api/order", orderRouter);

app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`);
});
