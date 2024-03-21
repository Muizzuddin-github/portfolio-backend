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
const joi_1 = __importDefault(require("joi"));
const auth_1 = __importDefault(require("../../src/controllers/auth"));
const users_1 = __importDefault(require("../../src/models/users"));
const error_1 = __importDefault(require("../../src/responses/error"));
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
jest.mock("../../src/models/users");
jest.mock("bcrypt");
describe("Register", () => {
    beforeAll(function () { });
    it("should register successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                username: "username",
                email: "email@example.com",
                password: "password",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        yield auth_1.default.register(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "Register successfully" });
    }));
    it("should validation error required", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                username: " ",
                email: " ",
                password: " ",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        try {
            yield auth_1.default.register(req, res, next);
        }
        catch (err) {
            if (err instanceof joi_1.default.ValidationError) {
                expect(res.status).not.toHaveBeenCalled();
                expect(res.json).not.toHaveBeenCalled();
                expect(next).toHaveBeenCalled();
            }
        }
    }));
    it("should error email already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            _id: new mongoose_1.default.Types.ObjectId(),
            username: "testing",
            email: "testing@gmail.com",
            password: "123",
            created_at: new Date().toISOString(),
        };
        users_1.default.findOne.mockResolvedValue(data);
        const req = {
            body: {
                username: "testing",
                email: "testing@gmail.com",
                password: "123",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        yield auth_1.default.register(req, res, next);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(new error_1.default(400, "Email already exists"));
    }));
});
describe("Login", () => {
    it("should success", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            _id: new mongoose_1.default.Types.ObjectId(),
            username: "testing",
            email: "testing@gmail.com",
            password: "123",
            created_at: "time",
        };
        users_1.default.findOne.mockResolvedValue(data);
        bcrypt_1.default.compare.mockResolvedValueOnce(true);
        const req = {
            body: {
                email: "testing@gmail.com",
                password: "123",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            cookie: jest.fn(),
        };
        const next = jest.fn();
        yield auth_1.default.login(req, res, next);
        expect(res.cookie).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Login successfully",
        });
        expect(next).not.toHaveBeenCalled();
    }));
    it("should validation error required", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            body: {
                email: " ",
                password: " ",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        yield auth_1.default.login(req, res, next);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
        expect(next.mock.calls[0][0] instanceof joi_1.default.ValidationError).toBe(true);
    }));
    it("should error email not found", () => __awaiter(void 0, void 0, void 0, function* () {
        users_1.default.findOne.mockResolvedValueOnce(null);
        const req = {
            body: {
                email: "testing@gmail.com",
                password: "123",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        yield auth_1.default.login(req, res, next);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
        expect(next.mock.calls[0][0] instanceof error_1.default).toBe(true);
    }));
    it("should error password wrong", () => __awaiter(void 0, void 0, void 0, function* () {
        const d = {
            _id: new mongoose_1.default.Types.ObjectId(),
            username: "testing",
            email: "testing@gmail.com",
            password: "123",
            created_at: "oke",
        };
        users_1.default.findOne.mockResolvedValueOnce(d);
        bcrypt_1.default.compare.mockResolvedValueOnce(false);
        const req = {
            body: {
                email: "testing@gmail.com",
                password: "123",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        yield auth_1.default.login(req, res, next);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
        expect(next.mock.calls[0][0] instanceof error_1.default).toBe(true);
    }));
});
describe("Logout", () => {
    it("should success", () => {
        const res = {
            cookie: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        auth_1.default.logout({}, res);
        expect(res.cookie).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    });
});
describe("Islogin", () => {
    it("should success", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            _id: new mongoose_1.default.Types.ObjectId(),
            username: "testing",
            email: "testing@gmail.com",
            password: "1234",
            created_at: new Date().toISOString(),
        };
        users_1.default.findOne.mockResolvedValueOnce(data);
        if (!process.env.SECRET_KEY) {
            console.log("Env invalid");
            return;
        }
        const token = jsonwebtoken_1.default.sign({ _id: new mongoose_1.default.Types.ObjectId() }, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });
        const req = {
            signedCookies: {
                secure: token,
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        yield auth_1.default.isLogin(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "user is login" });
        expect(next).not.toHaveBeenCalled();
    }));
    it("should error token undefined", () => __awaiter(void 0, void 0, void 0, function* () {
        if (!process.env.SECRET_KEY) {
            console.log("Env invalid");
            return;
        }
        const req = {
            signedCookies: {},
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        yield auth_1.default.isLogin(req, res, next);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
        expect(next.mock.calls[0][0] instanceof error_1.default).toBe(true);
    }));
    it("should error token expired", () => __awaiter(void 0, void 0, void 0, function* () {
        if (!process.env.SECRET_KEY) {
            console.log("Env invalid");
            return;
        }
        const token = jsonwebtoken_1.default.sign({ _id: new mongoose_1.default.Types.ObjectId() }, process.env.SECRET_KEY, {
            expiresIn: "0",
        });
        const req = {
            signedCookies: {
                secure: token,
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        yield auth_1.default.isLogin(req, res, next);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
        expect(next.mock.calls[0][0] instanceof jsonwebtoken_1.default.JsonWebTokenError).toBe(true);
    }));
    it("should error token dont have object id", () => __awaiter(void 0, void 0, void 0, function* () {
        if (!process.env.SECRET_KEY) {
            console.log("Env invalid");
            return;
        }
        const token = jsonwebtoken_1.default.sign({ _id: "dsd" }, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });
        const req = {
            signedCookies: {
                secure: token,
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        yield auth_1.default.isLogin(req, res, next);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
        expect(next.mock.calls[0][0] instanceof error_1.default).toBe(true);
    }));
    it("should error user not found", () => __awaiter(void 0, void 0, void 0, function* () {
        users_1.default.findOne.mockResolvedValue(null);
        if (!process.env.SECRET_KEY) {
            console.log("Env invalid");
            return;
        }
        const token = jsonwebtoken_1.default.sign({ _id: new mongoose_1.default.Types.ObjectId() }, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });
        const req = {
            signedCookies: {
                secure: token,
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        yield auth_1.default.isLogin(req, res, next);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
        expect(next.mock.calls[0][0] instanceof error_1.default).toBe(true);
    }));
});
