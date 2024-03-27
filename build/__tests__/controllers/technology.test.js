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
const technology_1 = __importDefault(require("../../src/controllers/technology"));
const technology_2 = __importDefault(require("../../src/models/technology"));
const axios_1 = __importDefault(require("axios"));
const stream_1 = require("stream");
const mongoose_1 = __importDefault(require("mongoose"));
const error_1 = __importDefault(require("../../src/responses/error"));
const joi_1 = __importDefault(require("joi"));
jest.mock("../../src/models/technology");
jest.mock("axios");
describe("GetAll", () => {
    it("should success", () => __awaiter(void 0, void 0, void 0, function* () {
        technology_2.default.find.mockResolvedValue([]);
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        yield technology_1.default.GetAll({}, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "All data technology",
            data: [],
        });
    }));
});
describe("Add", () => {
    it("should success", () => __awaiter(void 0, void 0, void 0, function* () {
        const resWeb = {
            data: {
                image: {
                    url: "kuy",
                },
            },
        };
        axios_1.default.post.mockResolvedValueOnce(resWeb);
        technology_2.default.prototype.save.mockResolvedValue({
            _id: new mongoose_1.default.Types.ObjectId(),
            name: "ke",
            logo: "oke",
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
                name: "kuy",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        yield technology_1.default.Add(req, res, next);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalled();
    }));
    it("should error img file required", () => __awaiter(void 0, void 0, void 0, function* () {
        const resWeb = {
            data: {
                image: {
                    url: "kuy",
                },
            },
        };
        axios_1.default.post.mockResolvedValueOnce(resWeb);
        technology_2.default.prototype.save.mockResolvedValue({
            _id: new mongoose_1.default.Types.ObjectId(),
            name: "ke",
            logo: "oke",
        });
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        yield technology_1.default.Add({}, res, next);
        expect(next).toHaveBeenCalledWith(new error_1.default(400, "Img file required with field 'logo'"));
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    }));
    it("should error validation name required", () => __awaiter(void 0, void 0, void 0, function* () {
        const resWeb = {
            data: {
                image: {
                    url: "kuy",
                },
            },
        };
        axios_1.default.post.mockResolvedValueOnce(resWeb);
        technology_2.default.prototype.save.mockResolvedValue({
            _id: new mongoose_1.default.Types.ObjectId(),
            name: "ke",
            logo: "oke",
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
            body: {},
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        yield technology_1.default.Add(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    }));
});
describe("Edit no file upload", () => {
    it("should success", () => __awaiter(void 0, void 0, void 0, function* () {
        const resWeb = {
            data: {
                image: {
                    url: "kuy",
                },
            },
        };
        const result = {
            matchedCount: 1,
        };
        technology_2.default.updateOne.mockResolvedValue(result);
        const req = {
            body: {
                name: "kuy",
            },
            params: {
                id: new mongoose_1.default.Types.ObjectId().toHexString(),
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        yield technology_1.default.Edit(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Update technology successfully",
        });
    }));
    it("should error not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = {
            matchedCount: 0,
        };
        technology_2.default.updateOne.mockResolvedValue(result);
        const req = {
            body: {
                name: "kuy",
            },
            params: {
                id: new mongoose_1.default.Types.ObjectId().toHexString(),
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        yield technology_1.default.Edit(req, res, next);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(new error_1.default(404, "Technology not found"));
    }));
    it("should error object id invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = {
            matchedCount: 0,
        };
        technology_2.default.updateOne.mockResolvedValue(result);
        const req = {
            body: {
                name: "kuy",
            },
            params: {
                id: "98989",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        yield technology_1.default.Edit(req, res, next);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(new error_1.default(400, "ID invalid"));
    }));
    it("should error required body", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = {
            matchedCount: 0,
        };
        technology_2.default.updateOne.mockResolvedValue(result);
        const req = {
            body: {},
            params: {
                id: new mongoose_1.default.Types.ObjectId().toHexString(),
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        yield technology_1.default.Edit(req, res, next);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
        expect(next.mock.calls[0][0] instanceof joi_1.default.ValidationError).toBe(true);
    }));
});
describe("Edit with upload file", () => {
    it("should success", () => __awaiter(void 0, void 0, void 0, function* () {
        const resWeb = {
            data: {
                image: {
                    url: "kuy",
                },
            },
        };
        axios_1.default.post.mockResolvedValueOnce(resWeb);
        const result = {
            matchedCount: 1,
        };
        technology_2.default.updateOne.mockResolvedValue(result);
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
                name: "kuy",
            },
            params: {
                id: new mongoose_1.default.Types.ObjectId().toHexString(),
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        yield technology_1.default.Edit(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    }));
    it("should error not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const resWeb = {
            data: {
                image: {
                    url: "kuy",
                },
            },
        };
        axios_1.default.post.mockResolvedValueOnce(resWeb);
        const result = {
            matchedCount: 0,
        };
        technology_2.default.updateOne.mockResolvedValue(result);
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
                name: "kuy",
            },
            params: {
                id: new mongoose_1.default.Types.ObjectId().toHexString(),
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        yield technology_1.default.Edit(req, res, next);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    }));
    it("should error id invalid", () => __awaiter(void 0, void 0, void 0, function* () {
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
                name: "kuy",
            },
            params: {
                id: "sdfds",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        yield technology_1.default.Edit(req, res, next);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(new error_1.default(400, "ID invalid"));
    }));
    it("should error name required", () => __awaiter(void 0, void 0, void 0, function* () {
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
            params: {
                id: new mongoose_1.default.Types.ObjectId().toHexString(),
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        yield technology_1.default.Edit(req, res, next);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
        expect(next.mock.calls[0][0] instanceof joi_1.default.ValidationError);
    }));
});
describe("Del", () => {
    it("should success", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = {
            deletedCount: 1,
        };
        technology_2.default.deleteOne.mockResolvedValueOnce(result);
        const req = {
            params: {
                id: new mongoose_1.default.Types.ObjectId().toHexString(),
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        yield technology_1.default.Del(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: "Delete technology successfully",
        });
        expect(next).not.toHaveBeenCalled();
    }));
    it("should error object id invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            params: {
                id: "dsd",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        yield technology_1.default.Del(req, res, next);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(new error_1.default(400, "ID invalid"));
    }));
    it("should error not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = {
            deletedCount: 0,
        };
        technology_2.default.deleteOne.mockResolvedValueOnce(result);
        const req = {
            params: {
                id: new mongoose_1.default.Types.ObjectId().toHexString(),
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        const next = jest.fn();
        yield technology_1.default.Del(req, res, next);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith(new error_1.default(404, "Technology not found"));
    }));
});
