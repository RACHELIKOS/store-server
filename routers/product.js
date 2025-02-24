import { Router } from "express";

import { getById, update, deleteById, add, getAllproduct } from "../controllers/product.js"
// import {  } from "../controllers/product.js";

const router = Router();
router.get("/", getAllproduct);
router.get("/id", getById);
router.delete("/:id", deleteById);
router.put("/:id", update);
router.post("/", add);

export default router;