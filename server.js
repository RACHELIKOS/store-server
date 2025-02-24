import express from "express";
import productRouter from "./routers/product.js";
import orderRouter from "./routers/order.js";
import userRouter from "./routers/user.js";
import { connectToDB } from "./config/db.js";
import dotenv from "dotenv";
import fs from "fs/promises";
import cors from "cors"; // Import the cors middleware

function printToLog(req, res, next) {
    try {
        fs.appendFile("./log.txt", `${new Date().toLocaleDateString()}  ${req.method} ${req.url} \n`);
        next();
    } catch (err) {
        return res.status(400).json({ title: "error in print to log", message: err.message });
    }
}

dotenv.config();
const app = express();
connectToDB();

// Configure CORS *before* any other routes
app.use(cors({
    origin: 'http://localhost:5173', // Or '*' for all origins (less secure for production)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods (optional)
    allowedHeaders: ['Content-Type'], // Specify allowed headers (optional)
}));

app.use(printToLog);
app.use(express.json());

app.use("/shop/user", userRouter);
app.use("/shop/product", productRouter);
app.use("/shop/order", orderRouter);

let port = process.env.PORT;

app.listen(port, () => {
    console.log("app " + port);
});