"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const technologySchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
});
const projectHistorySchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    technology: {
        type: [technologySchema],
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});
const ProjectHistoryCol = mongoose_1.default.model("my_project", projectHistorySchema, "my_project");
exports.default = ProjectHistoryCol;
