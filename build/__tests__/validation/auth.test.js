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
const auth_1 = __importDefault(require("../../src/validation/auth"));
describe("Register", () => {
    it("should success", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            username: "testing1",
            email: "testing@gmail.com",
            password: "123",
        };
        const val = yield auth_1.default.register(data);
        expect(val).toEqual(data);
    }));
    it("should validation required", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = {
                username: " ",
                email: " ",
                password: " ",
            };
            yield auth_1.default.register(data);
        }
        catch (err) {
            if (err instanceof joi_1.default.ValidationError) {
                expect(err instanceof joi_1.default.ValidationError).toBe(true);
                expect(err.message.split(".").length).toBe(3);
            }
        }
    }));
});
describe("Login", () => {
    it("should success", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            email: "testing@gmail.com",
            password: "123",
        };
        const val = yield auth_1.default.login(data);
        expect(val).toEqual(data);
    }));
    it("should validation error required", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = {
                email: " ",
                password: " ",
            };
            yield auth_1.default.login(data);
        }
        catch (err) {
            if (err instanceof joi_1.default.ValidationError) {
                expect(err.message.split(".").length).toBe(2);
            }
        }
    }));
});
