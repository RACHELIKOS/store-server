import { Router } from "express";
import { add_signUp, deleteById, getAllUsers, getById, update, updatePassword } from "../controllers/user.js";
const router = Router();
router.get("/", getAllUsers);
router.get("/:id", getById);
router.post("/signUp", add_signUp);
router.put("/:id", update);
router.post("/updatePassword/:id", updatePassword);
router.delete("/:id", deleteById);

export default router;