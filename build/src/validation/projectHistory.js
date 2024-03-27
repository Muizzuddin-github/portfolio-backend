"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class ProjectHistorySchema {
    static get dataSchema() {
        return joi_1.default.object({
            title: joi_1.default.string().trim().required(),
            description: joi_1.default.string().trim().required(),
            technology: joi_1.default.array()
                .items(joi_1.default.object({
                name: joi_1.default.string().trim().required(),
                logo: joi_1.default.string().trim().required(),
            }))
                .min(1),
        });
    }
}
class ProjectHistoryValidation extends ProjectHistorySchema {
    static data(body) {
        return super.dataSchema.validateAsync(body, {
            abortEarly: false,
        });
    }
}
exports.default = ProjectHistoryValidation;
