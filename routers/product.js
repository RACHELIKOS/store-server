import { Router } from "express";

import {getById,update,deleteById,add} from "../controllers/product.js"
import { getAllproduct } from "../controllers/product.js";

const router=Router();
router.get("/",getAllproduct);
router.get("/id",getById);
router.delete("/:id",deleteById);
router.put("/:id",update);
router.post("/",add);

export default router;