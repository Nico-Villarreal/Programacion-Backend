import { Router } from "express";
import products from "../routes/products.routes.js";
import cart from "../routes/carts.routes.js";
import viewProducts from "../routes/viewProducts.routes.js";
import realTimeProducts from "../routes/viewRealTimeProducts.routes.js";

const router = Router();

router.use('/api/products', products);
router.use('/api/carts', cart);
router.use('/noRealTimeProducts', viewProducts);
router.use('/realTimeProducts', realTimeProducts);

export default router;