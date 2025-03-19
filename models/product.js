import { Schema, model } from "mongoose";


const prodctSchema = Schema({
    name: String,
    descripition: String,
    date: { type: Date, default: new Date() },
    img: String,
    price: Number,
    qty: Number,
    details: [String],
    size: String,
    category: String,
    gender: String,
    type:String
})

export const prodctModel = model("product", prodctSchema)

