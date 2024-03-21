"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtVerify = (token, key) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, key, function (err, decoded) {
            if (err) {
                reject(err);
                return;
            }
            const d = decoded;
            resolve(d);
            return;
        });
    });
};
exports.default = jwtVerify;
