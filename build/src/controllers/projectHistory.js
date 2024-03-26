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
const projectHistory_1 = __importDefault(require("../validation/projectHistory"));
const axios_1 = __importDefault(require("axios"));
const projectHistory_2 = __importDefault(require("../models/projectHistory"));
class ProjectHistory {
    static getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield projectHistory_2.default.find();
                const r = {
                    message: "All data project history",
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
                    throw new error_1.default(400, "Image required");
                }
                const val = yield projectHistory_1.default.add(req.body);
                const blob = new Blob([req.file.buffer], { type: req.file.mimetype });
                const formData = new FormData();
                formData.append("source", blob, req.file.originalname);
                const resWeb = yield axios_1.default.post("https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5", formData);
                const data = resWeb.data;
                const insert = new projectHistory_2.default({
                    title: val.title,
                    image: data.image.url,
                    description: val.description,
                    technology: val.technology,
                });
                const n = yield insert.save();
                const insertedID = n._id;
                const r = {
                    message: "Add Project history successfully",
                    insertedID: insertedID.toHexString(),
                };
                res.status(201).json(r);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = ProjectHistory;
