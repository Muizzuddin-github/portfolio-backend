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
const technology_1 = __importDefault(require("../models/technology"));
const axios_1 = __importDefault(require("axios"));
const error_1 = __importDefault(require("../responses/error"));
const technology_2 = __importDefault(require("../validation/technology"));
const isObjectID_1 = __importDefault(require("../utility/isObjectID"));
class Technology {
    static GetAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield technology_1.default.find();
                const r = {
                    message: "All data technology",
                    data: data,
                };
                res.status(200).json(r);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static Add(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.file) {
                    throw new error_1.default(400, "Img file required with field 'logo'");
                }
                const val = yield technology_2.default.add(req.body);
                const blobData = new Blob([req.file.buffer], { type: req.file.mimetype });
                const formData = new FormData();
                formData.append("source", blobData, req.file.originalname);
                const resWeb = yield axios_1.default.post("https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5", formData);
                const data = resWeb.data;
                const insert = new technology_1.default({
                    name: val.name,
                    logo: data.image.url,
                });
                const n = yield insert.save();
                const insertedID = n._id;
                const r = {
                    message: "Add technology successfully",
                    insertedID: insertedID.toHexString(),
                };
                res.status(201).json(r);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static Edit(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idTech = req.params.id;
                if (!(0, isObjectID_1.default)(idTech)) {
                    throw new error_1.default(400, "ID invalid");
                }
                const val = yield technology_2.default.add(req.body);
                if (!req.file) {
                    const result = yield technology_1.default.updateOne({ _id: idTech }, {
                        name: val.name,
                    });
                    if (result.matchedCount === 0) {
                        throw new error_1.default(404, "Technology not found");
                    }
                    const r = {
                        message: "Update technology successfully",
                    };
                    res.status(200).json(r);
                    return;
                }
                const blobData = new Blob([req.file.buffer], {
                    type: req.file.mimetype,
                });
                const formData = new FormData();
                formData.append("source", blobData, req.file.originalname);
                const resWeb = yield axios_1.default.post("https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5", formData);
                const data = resWeb.data;
                const result = yield technology_1.default.updateOne({ _id: idTech }, {
                    name: val.name,
                    logo: data.image.url,
                });
                if (result.matchedCount === 0) {
                    throw new error_1.default(404, "Technology not found");
                }
                const r = {
                    message: "Update technology successfully",
                };
                res.status(200).json(r);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static Del(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idTech = req.params.id;
                if (!(0, isObjectID_1.default)(idTech)) {
                    throw new error_1.default(400, "ID invalid");
                }
                const result = yield technology_1.default.deleteOne({ _id: idTech });
                if (result.deletedCount === 0) {
                    throw new error_1.default(404, "Technology not found");
                }
                const r = {
                    message: "Delete technology successfully",
                };
                res.status(200).json(r);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = Technology;
