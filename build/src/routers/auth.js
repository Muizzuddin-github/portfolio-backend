"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../controllers/auth"));
const auth = express_1.default.Router();
auth.post("/api/register", auth_1.default.register);
auth.post("/api/login", auth_1.default.login);
auth.post("/api/logout", auth_1.default.logout);
auth.get("/api/islogin", auth_1.default.isLogin);
exports.default = auth;
