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
const technology_1 = __importDefault(require("../../src/validation/technology"));
describe("Technology Validation", () => {
    it("should success", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            name: "hasan",
        };
        const val = yield technology_1.default.add(data);
        expect(val).toEqual(data);
    }));
    it("should error required", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = {
                name: " ",
            };
            yield technology_1.default.add(data);
        }
        catch (err) {
            expect(err instanceof joi_1.default.ValidationError).toBe(true);
        }
    }));
});
