"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandling_1 = __importDefault(require("./middlewares/errorHandling"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_1 = __importDefault(require("./routers/auth"));
const projectHistory_1 = __importDefault(require("./routers/projectHistory"));
const technology_1 = __importDefault(require("./routers/technology"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["https://muhammad-muizzuddin.vercel.app", "http://localhost:5173"],
}));
app.use((0, cookie_parser_1.default)("secret"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(auth_1.default);
app.use(technology_1.default);
app.use(projectHistory_1.default);
app.use(errorHandling_1.default);
exports.default = app;
