"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __importDefault(require("../../src/responses/error"));
describe("ResponseErr", () => {
    it("should success", () => {
        const r = new error_1.default(200, "OK");
        expect(r.getStatusCode).toBe(200);
        expect(r.message).toBe("OK");
    });
});
