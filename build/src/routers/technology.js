"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const technology_1 = __importDefault(require("../controllers/technology"));
const onlyLogin_1 = __importDefault(require("../middlewares/onlyLogin"));
const multer_1 = __importDefault(require("../utility/multer"));
const technology = express_1.default.Router();
technology.get("/api/technology", onlyLogin_1.default, technology_1.default.getAll);
technology.post("/api/technology", onlyLogin_1.default, multer_1.default.single("logo"), technology_1.default.Add);
technology.put("/api/technology/:id", onlyLogin_1.default, multer_1.default.single("logo"), technology_1.default.Edit);
technology.delete("/api/technology/:id", onlyLogin_1.default, technology_1.default.Del);
exports.default = technology;
