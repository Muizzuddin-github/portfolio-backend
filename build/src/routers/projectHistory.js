"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectHistory_1 = __importDefault(require("../controllers/projectHistory"));
const multer_1 = __importDefault(require("../utility/multer"));
const onlyLogin_1 = __importDefault(require("../middlewares/onlyLogin"));
const projectHistory = express_1.default.Router();
projectHistory.get("/api/project-history", projectHistory_1.default.GetAll);
projectHistory.post("/api/project-history", onlyLogin_1.default, multer_1.default.single("image"), projectHistory_1.default.Add);
projectHistory.put("/api/project-history/:id", onlyLogin_1.default, multer_1.default.single("image"), projectHistory_1.default.Edit);
projectHistory.delete("/api/project-history/:id", projectHistory_1.default.Del);
exports.default = projectHistory;
