"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __importDefault(require("../responses/error"));
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const multer_1 = __importDefault(require("multer"));
const axios_1 = __importDefault(require("axios"));
function errorHandling(err, req, res, next) {
    var _a, _b;
    if (!err) {
        next();
        return;
    }
    if (err instanceof error_1.default) {
        const r = {
            errors: [err.message],
        };
        res.status(err.getStatusCode).json(r);
        return;
    }
    else if (err instanceof joi_1.default.ValidationError) {
        const r = {
            errors: err.message.split("."),
        };
        res.status(400).json(r);
        return;
    }
    else if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
        const r = {
            errors: err.message.split("."),
        };
        res.status(401).json(r);
        return;
    }
    else if (err instanceof multer_1.default.MulterError) {
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
            const r = {
                errors: ["Logo field required"],
            };
            res.status(400).json(r);
            return;
        }
        const r = {
            errors: err.message.split("."),
        };
        res.status(400).json(r);
        return;
    }
    else if (err instanceof axios_1.default.AxiosError) {
        const r = {
            errors: [((_a = err.response) === null || _a === void 0 ? void 0 : _a.data.error.message) || err.message],
        };
        res.status(((_b = err.response) === null || _b === void 0 ? void 0 : _b.status) || 500).json(r);
        return;
    }
    const r = {
        errors: [err.message],
    };
    res.status(500).json(r);
}
exports.default = errorHandling;
