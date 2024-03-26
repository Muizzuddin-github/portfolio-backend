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
const projectHistory_1 = __importDefault(require("../../src/controllers/projectHistory"));
const projectHistory_2 = __importDefault(require("../../src/models/projectHistory"));
const error_1 = __importDefault(require("../../src/responses/error"));
const stream_1 = require("stream");
const joi_1 = __importDefault(require("joi"));
const axios_1 = __importDefault(require("axios"));
const mongoose_1 = __importDefault(require("mongoose"));
jest.mock("../../src/models/projectHistory");
jest.mock("axios");
describe("GetAll", () => {
    it("should success", () => __awaiter(void 0, void 0, void 0, function* () {
        projectHistory_2.default.find.mockResolvedValue([]);
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        const next = jest.fn();
        yield projectHistory_1.default.getAll({}, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "All data project history",
            data: [],
        });
    }));
});
describe("Add", () => {
    it("should error image required", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const next = jest.fn();
            yield projectHistory_1.default.Add({}, {}, next);
        }
        catch (err) {
            if (err instanceof error_1.default) {
                expect(err.getStatusCode).toBe(400);
                expect(err.message).toBe("Image required");
            }
        }
    }));
    it("should error required validation", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            file: {
                filename: "txt",
                fieldname: "txt",
                originalname: "txt.jpg",
                mimetype: "image/jpg",
                destination: "",
                path: "",
                size: 100,
                stream: stream_1.Readable.from([]),
                encoding: "",
                buffer: Buffer.from("okeh", "utf8"),
            },
            body: {},
        };
        const next = jest.fn();
        yield projectHistory_1.default.Add(req, {}, next);
        expect(next).toHaveBeenCalled();
        expect(next.mock.calls[0][0] instanceof joi_1.default.ValidationError).toBe(true);
    }));
    it("should error axios", () => __awaiter(void 0, void 0, void 0, function* () {
        axios_1.default.post.mockRejectedValueOnce(new axios_1.default.AxiosError());
        const req = {
            file: {
                filename: "txt",
                fieldname: "txt",
                originalname: "txt.jpg",
                mimetype: "image/jpg",
                destination: "",
                path: "",
                size: 100,
                stream: stream_1.Readable.from([]),
                encoding: "",
                buffer: Buffer.from("okeh", "utf8"),
            },
            body: {
                title: "okeh gas",
                description: "aa",
                technology: [
                    {
                        name: "as",
                        logo: "dsds",
                    },
                ],
            },
        };
        const next = jest.fn();
        yield projectHistory_1.default.Add(req, {}, next);
        expect(next).toHaveBeenCalled();
        expect(next.mock.calls[0][0] instanceof axios_1.default.AxiosError).toBe(true);
    }));
    it("should success", () => __awaiter(void 0, void 0, void 0, function* () {
        const resWeb = {
            data: {
                image: {
                    url: "kuy",
                },
            },
        };
        axios_1.default.post.mockResolvedValueOnce(resWeb);
        projectHistory_2.default.prototype.save.mockResolvedValueOnce({
            _id: new mongoose_1.default.Types.ObjectId(),
        });
        const req = {
            file: {
                filename: "txt",
                fieldname: "txt",
                originalname: "txt.jpg",
                mimetype: "image/jpg",
                destination: "",
                path: "",
                size: 100,
                stream: stream_1.Readable.from([]),
                encoding: "",
                buffer: Buffer.from("okeh", "utf8"),
            },
            body: {
                title: "okeh gas",
                description: "aa",
                technology: [
                    {
                        name: "as",
                        logo: "dsds",
                    },
                ],
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        yield projectHistory_1.default.Add(req, res, next);
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalled();
    }));
});
