"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const onlyLogin_1 = __importDefault(require("../../src/middlewares/onlyLogin"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("../../src/models/users"));
const dotenv_1 = __importDefault(require("dotenv"));
const error_1 = __importDefault(require("../../src/responses/error"));
dotenv_1.default.config();
jest.mock("../../src/models/users");
describe("OnlyLogin", () => {
    it("should success", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            _id: new mongoose_1.default.Types.ObjectId(),
            username: "testing",
            email: "testing@gmail.com",
            password: "123",
            created_at: "oke",
        };
        users_1.default.findById.mockResolvedValue(data);
        const token = jsonwebtoken_1.default.sign({ _id: new mongoose_1.default.Types.ObjectId() }, process.env.SECRET_KEY || "", {
            expiresIn: "1d",
        });
        const req = {
            signedCookies: {
                secure: token,
            },
        };
        const next = jest.fn();
        yield (0, onlyLogin_1.default)(req, {}, next);
        expect(next).toHaveBeenCalled();
        expect(next.mock.calls[0].length).toBe(0);
    }));
    it("should error no token", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            _id: new mongoose_1.default.Types.ObjectId(),
            username: "testing",
            email: "testing@gmail.com",
            password: "123",
            created_at: "oke",
        };
        users_1.default.findById.mockResolvedValue(data);
        const req = {
            signedCookies: {
                secure: undefined,
            },
        };
        const next = jest.fn();
        yield (0, onlyLogin_1.default)(req, {}, next);
        expect(next).toHaveBeenCalledWith(new error_1.default(401, "Unauthorized"));
        expect(next.mock.calls[0].length).toBe(1);
        expect(next.mock.calls[0][0] instanceof error_1.default).toBe(true);
    }));
    it("should error token expired", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            _id: new mongoose_1.default.Types.ObjectId(),
            username: "testing",
            email: "testing@gmail.com",
            password: "123",
            created_at: "oke",
        };
        users_1.default.findById.mockResolvedValue(data);
        const token = jsonwebtoken_1.default.sign({ _id: new mongoose_1.default.Types.ObjectId() }, process.env.SECRET_KEY || "", {
            expiresIn: "0",
        });
        const req = {
            signedCookies: {
                secure: token,
            },
        };
        const next = jest.fn();
        yield (0, onlyLogin_1.default)(req, {}, next);
        expect(next).toHaveBeenCalledWith(new jsonwebtoken_1.default.TokenExpiredError("jwt expired", new Date(Date.now())));
        expect(next.mock.calls[0].length).toBe(1);
        expect(next.mock.calls[0][0] instanceof jsonwebtoken_1.default.JsonWebTokenError).toBe(true);
    }));
    it("should error object id invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            _id: new mongoose_1.default.Types.ObjectId(),
            username: "testing",
            email: "testing@gmail.com",
            password: "123",
            created_at: "oke",
        };
        users_1.default.findById.mockResolvedValue(data);
        const token = jsonwebtoken_1.default.sign({ _id: "okjksj" }, process.env.SECRET_KEY || "", {
            expiresIn: "1d",
        });
        const req = {
            signedCookies: {
                secure: token,
            },
        };
        const next = jest.fn();
        yield (0, onlyLogin_1.default)(req, {}, next);
        expect(next).toHaveBeenCalledWith(new error_1.default(401, "Unauthorized"));
        expect(next.mock.calls[0].length).toBe(1);
        expect(next.mock.calls[0][0] instanceof error_1.default).toBe(true);
    }));
    it("should error user not found", () => __awaiter(void 0, void 0, void 0, function* () {
        users_1.default.findById.mockResolvedValue(null);
        const token = jsonwebtoken_1.default.sign({ _id: new mongoose_1.default.Types.ObjectId() }, process.env.SECRET_KEY || "", {
            expiresIn: "1d",
        });
        const req = {
            signedCookies: {
                secure: token,
            },
        };
        const next = jest.fn();
        yield (0, onlyLogin_1.default)(req, {}, next);
        expect(next).toHaveBeenCalledWith(new error_1.default(401, "Unauthorized"));
        expect(next.mock.calls[0].length).toBe(1);
        expect(next.mock.calls[0][0] instanceof error_1.default).toBe(true);
    }));
});
