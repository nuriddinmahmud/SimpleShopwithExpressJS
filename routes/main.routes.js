import { Router } from "express";
import commentRouter from "./comments.routes.js";
import productRouter from "./products.routes.js";
import regionRouter from "./regions.routes.js";
import orderRouter from "./orders.routes.js";
import ordersItemRouter from "./ordersItem.routes.js";
import UserRouter from "./users.routes.js";

const mainRouter = Router();

mainRouter.use("/ordersItem", ordersItemRouter);
mainRouter.use("/comments", commentRouter);
mainRouter.use("/products", productRouter);
mainRouter.use("/regions", regionRouter);
mainRouter.use("/orders", orderRouter);
mainRouter.use("/users", UserRouter);

export default mainRouter;
