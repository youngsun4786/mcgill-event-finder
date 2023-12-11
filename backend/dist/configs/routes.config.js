"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureRoutes = void 0;
const routes_1 = require("../routes");
const configureRoutes = (app) => {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
        next();
    });
    app.use("/users", routes_1.UserRouter);
    app.use("/auth", routes_1.AuthRouter);
    app.use("/posts", routes_1.PostRouter);
};
exports.configureRoutes = configureRoutes;
