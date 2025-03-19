import { Router } from "express";

import { getAllorders, getById, update, deleteById, add,getBorrowsByUserId } from "../controllers/order.js"
import { isUserIn,isUserManager } from "../middelewares/isUserIn.js";

const router = Router();
router.get("/", getAllorders);
router.get("/id", getById);
router.get("/byuserid/:userid", isUserIn, getBorrowsByUserId)
router.delete("/:id", deleteById);
router.put("/:id",isUserIn, update);
router.post("/",isUserIn, add);

export default router;