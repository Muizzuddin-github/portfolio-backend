"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class AuthValidationSchema {
    static get registerSchema() {
        return joi_1.default.object({
            username: joi_1.default.string().trim().required(),
            email: joi_1.default.string().trim().email().required(),
            password: joi_1.default.string().trim().required(),
        });
    }
    static get loginSchema() {
        return joi_1.default.object({
            email: joi_1.default.string().trim().email().required(),
            password: joi_1.default.string().trim().required(),
        });
    }
}
class AuthValidation extends AuthValidationSchema {
    static register(body) {
        return super.registerSchema.validateAsync(body, {
            abortEarly: false,
        });
    }
    static login(body) {
        return super.loginSchema.validateAsync(body, {
            abortEarly: false,
        });
    }
}
exports.default = AuthValidation;
