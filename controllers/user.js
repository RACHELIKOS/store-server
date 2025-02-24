import { userModel } from "../models/user.js";
import bcrypt from "bcrypt";

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
