const express = require("express");
const swaggerJSdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/userRoutes");
const { auth } = require("./middleware/auth.middleware");
const { productRoutes } = require("./routes/productRoutes");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

const options={
    definition: {
        openapi:"3.0.0",
        info: {
            title:"Myntra",
            version:"1.0.0"
        },
        servers:[
            {
                url:"https://myntra-vzgy.onrender.com/"
            }
        ]
    },
    apis:["./routes/*.js"]
}

const swaggerSpec=swaggerJSdoc(options)
app.use("/docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec))

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
