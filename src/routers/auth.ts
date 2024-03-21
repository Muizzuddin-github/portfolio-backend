import express from "express";
import Auth from "../controllers/auth";

const auth: express.Router = express.Router();

auth.post("/api/register", Auth.register);
auth.post("/api/login", Auth.login);
auth.post("/api/logout", Auth.logout);
auth.get("/api/islogin", Auth.isLogin);

export default auth;
