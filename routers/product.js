import { Router } from "express";

import { getById, update, deleteById, add, getAllproduct,getTotalCount } from "../controllers/product.js"
import {isUserManager } from "../middelewares/isUserIn.js";

const router = Router();
router.get("/", getAllproduct);
router.get("/id", getById);
router.delete("/:id",isUserManager, deleteById);
router.put("/:id",isUserManager,update);
router.post("/",isUserManager, add);
router.get("/totalPages", getTotalCount);

export default router;