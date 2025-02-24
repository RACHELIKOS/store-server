import { ObjectId } from "bson";
import { Schema, Types, model } from "mongoose";
import { type } from "os";
import { boolean, float } from "webidl-conversions";

const orderSchema = Schema({

    orderDate: { type: Date, default: new Date() },
    getDate: { type: Date, default: new Date() },
    address: String,
    userId: {
        type: Types.ObjectId,
        ref: "user"
    },
    produdt: [{
        productId: { type: Types.ObjectId, ref: "product" }, // קישור למוצר
        name: String,
        qty: Number,
        price: Number
    }],
    getOff: Boolean,
    sendPrice: Number,
    finalPrice: Number
})

export const orderModel = model("order", orderSchema)