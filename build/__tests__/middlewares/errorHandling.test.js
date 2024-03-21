"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandling_1 = __importDefault(require("../../src/middlewares/errorHandling"));
const error_1 = __importDefault(require("../../src/responses/error"));
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const multer_1 = __importDefault(require("multer"));
describe("ErrorHandling", () => {
    it("should success", () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        (0, errorHandling_1.default)(null, {}, res, next);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith();
    });
    it("should ResponseErr", () => {
        const err = new error_1.default(400, "not found");
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        (0, errorHandling_1.default)(err, {}, res, next);
        const r = {
            errors: ["not found"],
        };
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(r);
        expect(next).not.toHaveBeenCalledWith();
    });
    it("should joi validation error", () => {
        const err = new joi_1.default.ValidationError("required", [], "");
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        (0, errorHandling_1.default)(err, {}, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            errors: ["required"],
        });
        expect(next).not.toHaveBeenCalledWith();
    });
    it("should jsonwebtoken error", () => {
        const err = new jsonwebtoken_1.default.JsonWebTokenError("token expired");
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        (0, errorHandling_1.default)(err, {}, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            errors: ["token expired"],
        });
        expect(next).not.toHaveBeenCalledWith();
    });
    it("should multer error logo required", () => {
        const err = new multer_1.default.MulterError("LIMIT_UNEXPECTED_FILE", "error");
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        (0, errorHandling_1.default)(err, {}, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            errors: ["Logo field required"],
        });
        expect(next).not.toHaveBeenCalledWith();
    });
    it("should multer error ", () => {
        const err = new multer_1.default.MulterError("LIMIT_FIELD_COUNT", "error");
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        (0, errorHandling_1.default)(err, {}, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            errors: ["Too many fields"],
        });
        expect(next).not.toHaveBeenCalledWith();
    });
    it("should Internal server error", () => {
        const err = new Error("server down");
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        (0, errorHandling_1.default)(err, {}, res, next);
        const r = {
            errors: ["server down"],
        };
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(r);
        expect(next).not.toHaveBeenCalledWith();
    });
});
