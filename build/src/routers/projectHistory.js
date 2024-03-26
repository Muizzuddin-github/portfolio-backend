"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectHistory_1 = __importDefault(require("../controllers/projectHistory"));
const multer_1 = __importDefault(require("../utility/multer"));
const projectHistory = express_1.default.Router();
projectHistory.get("/api/project-history", projectHistory_1.default.getAll);
projectHistory.post("/api/project-history", multer_1.default.single("image"), projectHistory_1.default.Add);
exports.default = projectHistory;
