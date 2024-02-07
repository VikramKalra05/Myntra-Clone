const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/userRoutes");
const { auth } = require("./middleware/auth.middleware");
const { productRoutes } = require("./routes/productRoutes");
const dotenv = require("dotenv").config();
const cors = require(cors);

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: "*"
}));
app.use(express.json());
app.use("/user", userRouter);
app.use("/products", productRoutes);

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.get("/data", auth, (req, res) => {
    res.send("Data.....");
});


app.listen(PORT, async () => {
    try {
        await connection;
        console.log(`Server is running at port ${PORT} and db is connected`);
    } catch (error) {
        console.log(error);
    }
})
