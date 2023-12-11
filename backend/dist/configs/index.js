"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = exports.configureServer = exports.configureRoutes = void 0;
var routes_config_1 = require("./routes.config");
Object.defineProperty(exports, "configureRoutes", { enumerable: true, get: function () { return routes_config_1.configureRoutes; } });
var server_config_1 = require("./server.config");
Object.defineProperty(exports, "configureServer", { enumerable: true, get: function () { return server_config_1.configureServer; } });
var db_config_1 = require("./db.config");
Object.defineProperty(exports, "connectToDatabase", { enumerable: true, get: function () { return db_config_1.connectToDatabase; } });
