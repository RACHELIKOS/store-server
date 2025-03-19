// import express from "express";
// import productRouter from "./routers/product.js";
// import orderRouter from "./routers/order.js";
// import userRouter from "./routers/user.js";
// import { connectToDB } from "./config/db.js";
// import dotenv from "dotenv";
// import fs from "fs/promises";
// import cors from "cors"; // Import the cors middleware

// function printToLog(req, res, next) {
//     try {
//         fs.appendFile("./log.txt", `${new Date().toLocaleDateString()}  ${req.method} ${req.url} \n`);
//         next();
//     } catch (err) {
//         return res.status(400).json({ title: "error in print to log", message: err.message });
//     }
// }

// dotenv.config();
// const app = express();
// connectToDB();

// // 🔹 מאפשר גישה מכל הכתובות
// app.use(cors({
//     origin: '*', // כל הכתובות מותרות (לא מאובטח בפרודקשן!)
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'], // הוספתי גם Authorization אם תצטרך
// }));

// app.use(printToLog);
// app.use(express.json());

// app.use("/shop/user", userRouter);
// app.use("/shop/product", productRouter);
// app.use("/shop/order", orderRouter);

// let port = process.env.PORT || 4002;

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
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

// 🔹 מאפשר גישה מכל הכתובות
app.use(cors({
    origin: '*', // כל הכתובות מותרות (לא מאובטח בפרודקשן!)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // הוספתי גם Authorization אם תצטרך
}));

app.use(printToLog);
app.use(express.json());

app.use("/shop/user", userRouter);
app.use("/shop/product", productRouter);
app.use("/shop/order", orderRouter);

// Middleware to handle undefined routes (404 errors)
app.use((req, res, next) => {
    res.status(404).json({
        title: "Not Found",
        message: `The route ${req.originalUrl} does not exist.`
    });
});

let port = process.env.PORT || 4002;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
