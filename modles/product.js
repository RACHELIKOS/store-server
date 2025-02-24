import { Schema, model } from "mongoose";
import { type } from "os";
import { float } from "webidl-conversions";

const productSchema = Schema({
    name: String,
    description: String,
    date: { type: Date, default: new Date() },
    img: String,
    price: Number,
    details: [String],
    qty: Number
})

export const productModel = model("produt", productSchema)