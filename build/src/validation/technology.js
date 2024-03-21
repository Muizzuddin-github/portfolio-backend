"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class TechnologyValidationSchema {
    static get addSchema() {
        return joi_1.default.object({
            name: joi_1.default.string().trim().required(),
        });
    }
}
class TechnologyValidation extends TechnologyValidationSchema {
    static add(body) {
        return super.addSchema.validateAsync(body, {
            abortEarly: false,
        });
    }
}
exports.default = TechnologyValidation;
