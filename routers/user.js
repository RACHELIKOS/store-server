import { Router } from "express";
import { add_signUp, deleteById, getAllUsers, getById, update, updatePassword,Login } from "../controllers/user.js";
import { isUserIn } from "../middelewares/isUserIn.js";

const router = Router();
router.get("/", getAllUsers);
router.get("/:id", getById);
router.post("/signUp", add_signUp);
router.put("/:id",isUserIn, update);
router.post("/updatePassword/:id",isUserIn, updatePassword);
router.delete("/:id", deleteById);
router.post("/login", Login); // התחברות

export default router;