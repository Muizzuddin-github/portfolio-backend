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
    created_at: {
        type: Date,
        default: Date.now,
    },
});
const TechnologyCol = mongoose_1.default.model("technology", technologySchema, "technology");
exports.default = TechnologyCol;
