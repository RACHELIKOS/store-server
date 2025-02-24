import { Schema, model } from "mongoose";
const userSchema = Schema({
    username: String,
    password: String,
    email: String,
    date: { type: Date, default: new Date() },
    role: { type: String, default: "user" }
})
export const userModel = model("user", userSchema)