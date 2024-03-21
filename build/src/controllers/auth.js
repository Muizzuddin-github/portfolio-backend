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
const auth_1 = __importDefault(require("../validation/auth"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = __importDefault(require("../models/users"));
const error_1 = __importDefault(require("../responses/error"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtVerify_1 = __importDefault(require("../utility/jwtVerify"));
const isObjectID_1 = __importDefault(require("../utility/isObjectID"));
class Auth {
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const val = yield auth_1.default.register(req.body);
                const checkEmail = yield users_1.default.findOne({
                    email: val.email,
                });
                if (checkEmail) {
                    throw new error_1.default(400, "Email already exists");
                }
                const salt = yield bcrypt_1.default.genSalt(10);
                const hashPassword = yield bcrypt_1.default.hash(val.password, salt);
                val.password = hashPassword;
                const insert = new users_1.default(val);
                yield insert.save();
                const r = {
                    message: "Register successfully",
                };
                res.status(200).json(r);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const val = yield auth_1.default.login(req.body);
                const user = yield users_1.default.findOne({
                    email: val.email,
                });
                if (!user) {
                    throw new error_1.default(400, "Check your email or password");
                }
                const checkPassword = yield bcrypt_1.default.compare(val.password, user.password);
                if (!checkPassword) {
                    throw new error_1.default(400, "Check your email or password");
                }
                if (!process.env.SECRET_KEY) {
                    throw new Error("Env Invalid");
                }
                const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.SECRET_KEY, {
                    expiresIn: "1d",
                });
                res.cookie("secure", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    maxAge: 24 * 60 * 60 * 1000,
                    signed: true,
                    priority: "high",
                });
                const r = {
                    message: "Login successfully",
                };
                res.status(200).json(r);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static logout(req, res) {
        res.cookie("secure", "", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 0,
            signed: true,
            priority: "high",
        });
        const r = {
            message: "Logout successfully",
        };
        res.status(200).json(r);
    }
    static isLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.signedCookies.secure;
                if (!token) {
                    throw new error_1.default(401, "Unauthorized");
                }
                if (!process.env.SECRET_KEY) {
                    throw new Error("Env invalid");
                }
                const decoded = yield (0, jwtVerify_1.default)(token, process.env.SECRET_KEY);
                if (!(0, isObjectID_1.default)(decoded._id)) {
                    throw new error_1.default(401, "Unathorized");
                }
                const user = yield users_1.default.findOne({
                    _id: decoded._id,
                });
                if (!user) {
                    throw new error_1.default(401, "Unathorized");
                }
                res.status(200).json({ message: "user is login" });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = Auth;
