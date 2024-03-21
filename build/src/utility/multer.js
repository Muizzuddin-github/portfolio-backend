"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const error_1 = __importDefault(require("../responses/error"));
const filter = function (req, file, cb) {
    var allowedMimes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedMimes.includes(file.mimetype)) {
        cb(new error_1.default(400, "Ext file not allowed"), false);
    }
    cb(null, true);
};
const upload = (0, multer_1.default)({
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
    fileFilter: filter,
});
exports.default = upload;
