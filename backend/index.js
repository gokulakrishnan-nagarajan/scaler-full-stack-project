const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const userRouter = require("./routes/user");
const productsRouter = require("./routes/products");

dotenv.config();

const app = express();
const PORT = process.env.port || 8080;
const dbUrl = process.env.dbUrl;

// console.log("env", env);

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

//
// Cart
//

//
// Wishlist
//

//
// Orders
//

app.listen(PORT, () => {
    console.log(`Server listening at ${PORT}`);
});
