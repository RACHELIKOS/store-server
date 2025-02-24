
import mongoose, { Schema, model, Types } from "mongoose";



// הגדרת סכמת ההזמנה
const orderSchema = Schema({
    orderDate: { type: Date, default: new Date() },
    getDate: { type: Date, default: new Date() },
    address: String,
    userId: {
        type: Types.ObjectId,
        ref: "user" // הפנייה למודל "user"
    },
    product: [{
        productId: { type: Types.ObjectId, ref: "product" }, // קישור למודל "product"
        name: String, // שם המוצר
        qty: Number, // כמות
        price: Number // מחיר המוצר
    }],
    isGetOff: mongoose.SchemaTypes.Boolean, // האם יש הנחה
    price: Number, // המחיר הכולל
    finalPrice: Number // המחיר הסופי אחרי הנחה
});

// יצירת המודל "order"
export const orderModel = model("order", orderSchema);