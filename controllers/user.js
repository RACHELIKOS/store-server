import { userModel } from "../models/user.js";
import bcrypt from "bcrypt";
import crypto from 'crypto';

import { generateToken } from "../utils/generateToken.js";

export async function getAllUsers(req, res) {
    try {
        let data = await userModel.find();
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json({ title: "Cannot get all users", message: err.message });
    }
}

export async function getById(req, res) {
    let { id } = req.params;
    try {
        let data = await userModel.findById(id);
        if (!data) {
            return res.status(404).json({ title: "Not Found", message: "User with such ID not found" });
        }
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json({ title: "Error", message: err.message });
    }
}

export async function update(req, res) {
    let { id } = req.params;
    try {
        const { password, ...fieldsToUpdate } = req.body;
        let data = await userModel.findByIdAndUpdate(id, fieldsToUpdate, { new: true });
        if (!data) return res.status(404).json({ title: "Not Found", message: "User not found" });
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json({ title: "Error", message: err.message });
    }
}

export async function updatePassword(req, res) {
    let { id } = req.params;
    const { password } = req.body;
    if (!password) {
        return res.status(400).json({ title: "Error", message: "Password required" });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        let user = await userModel.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
        if (!user) return res.status(404).json({ title: "Not Found", message: "User not found" });
        res.json({ title: "Password updated", user });
    } catch (err) {
        console.log(err);
        res.status(400).json({ title: "Error", message: err.message });
    }
}

export async function add_signUp(req, res) {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ title: "Missing parameters", message: "Username, email, and password are required" });
    }
    // בדיקה אם המשתמש כבר קיים
    const existingUser = await userModel.findOne({ email }).lean();
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        let newUser = new userModel({ ...req.body, password: hashedPassword });
        await newUser.save();
        res.json(newUser);
    } catch (err) {
        console.log(err);
        res.status(400).json({ title: "Cannot add user", message: err.message });
    }
}

export async function deleteById(req, res) {
    let { id } = req.params;
    try {
        let data = await userModel.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).json({ title: "Cannot delete", message: "User with such ID not found" });
        }
        res.json({ title: "User deleted", data });
    } catch (err) {
        console.log(err);
        res.status(400).json({ title: "Error", message: err.message });
    }
}

export async function Login(req, res) {
    console.log(req.body)
    // let r = generateToken({ ...userModel,password:req.body.password, role: "user" });

    // try {
    //     let data = await userModel.findOne({
    //         password: req.body.password, username: req.body.username
    //     });
    //     console.log(req.body)
    //     if (!data)
    //         return res.status(404).json({ title: "cannot find user with such details", message: "wrong username or password " })
    //     res.json(data);
    // }
    // catch (err) {
    //     console.log(err)
    //     res.status(400).json({ title: "cannot log in user", message: err.message })
    // }
    try {
        if (!req.body.email || !req.body.password)
            return res.status(404).json({ title: "missing email or password", message: "missing" })
        let data = await userModel.findOne({ email: req.body.email }).lean();
        if (!data)
            return res.status(404).json({ title: "no such user", message: "cannot fing any user with such email  " })
        console.log(data.password + "pass")
        //console.log(r + "r")
        console.log({ data } + "data")

        //if (!crypto.timingSafeEqual(Buffer.from(data.token),r)) 

        const match = await bcrypt.compare(req.body.password, data.password);
        if (!match)
            return res.status(404).json({ title: "cannot find user with such details", message: "wrong  password" })
        //צריך כאן להפריד לחיםש לפי שם משתמש
        //ואם לא נמצא להחזיר הודעה שאיןם כזה משתמש
        //אם קיים אךל סיסמא שגויה יש להחזיר הודעה אחרת

        let token = generateToken({ ...userModel, role:data.role });

        let { password, ...other } = data;

        other.token = token;
        console.log(other)
        res.json(other);

    }
    catch (err) {
        console.log(err)
        res.status(400).json({ title: "cannot log in user", message: err.message })
    }

}
