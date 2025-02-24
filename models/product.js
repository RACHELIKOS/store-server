import { Schema, model } from "mongoose";
// import { stringify } from "qs";
// import { float } from "webidl-conversions";

const prodctSchema = Schema({
    name: String,
    descripition: String,
    date: { type: Date, default: new Date() },
    img: String,
    price: Number,
    qty: Number,
    details: [String]
})

export const prodctModel = model("product", prodctSchema)