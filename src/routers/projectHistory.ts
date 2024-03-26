import express from "express";
import ProjectHistory from "../controllers/projectHistory";
import upload from "../utility/multer";
import onlyLogin from "../middlewares/onlyLogin";

const projectHistory: express.Router = express.Router();

projectHistory.get("/api/project-history", ProjectHistory.getAll);
projectHistory.post(
  "/api/project-history",
  upload.single("image"),
  onlyLogin,
  ProjectHistory.Add
);

export default projectHistory;
