import { Schema, model } from "mongoose";
import { type } from "os";

const userSchema = Schema({
    email: String,
    name: String,
    password: String,
    role: { type: String, default: "user" },
    date: { type: Date, default: new Date() }

})

export const userModel = model("user", userSchema)