import { Router } from "express";

import { getAllorders, getById, update, deleteById, add } from "../controllers/order.js"

const router = Router();
router.get("/", getAllorders);
router.get("/id", getById);
router.delete("/:id", deleteById);

router.put("/:id", update);

router.post("/", add);

export default router;