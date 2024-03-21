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
const error_1 = __importDefault(require("../responses/error"));
const jwtVerify_1 = __importDefault(require("../utility/jwtVerify"));
const isObjectID_1 = __importDefault(require("../utility/isObjectID"));
const users_1 = __importDefault(require("../models/users"));
const onlyLogin = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.signedCookies.secure;
            if (!token) {
                throw new error_1.default(401, "Unauthorized");
            }
            if (!process.env.SECRET_KEY) {
                throw new Error("Env Invalid");
            }
            const decoded = yield (0, jwtVerify_1.default)(token, process.env.SECRET_KEY);
            if (!(0, isObjectID_1.default)(decoded._id)) {
                throw new error_1.default(401, "Unauthorized");
            }
            const user = yield users_1.default.findById(decoded._id);
            if (!user) {
                throw new error_1.default(401, "Unauthorized");
            }
            next();
        }
        catch (err) {
            next(err);
        }
    });
};
exports.default = onlyLogin;
