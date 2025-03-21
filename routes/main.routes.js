const express = require("express");
const commentRouter = require("./comments.routes.js");
const productRouter = require("./products.routes.js");
const regionRouter = require("./regions.routes.js");
const orderRouter = require("./orders.routes.js");
const userRouter = require("./users.routes.js");
const categoryRouter = require("./category.routes.js");
const sessionRouter = require("./sessions.routes.js");

const mainRouter = express.Router();

mainRouter.use("/comments", commentRouter);
mainRouter.use("/products", productRouter);
mainRouter.use("/regions", regionRouter);
mainRouter.use("/orders", orderRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/category", categoryRouter);
mainRouter.use("/sessions", sessionRouter);

module.exports = mainRouter;
