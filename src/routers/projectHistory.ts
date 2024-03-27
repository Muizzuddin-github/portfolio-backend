import express from "express";
import ProjectHistory from "../controllers/projectHistory";
import upload from "../utility/multer";
import onlyLogin from "../middlewares/onlyLogin";

const projectHistory: express.Router = express.Router();

projectHistory.get("/api/project-history", ProjectHistory.GetAll);
projectHistory.post(
  "/api/project-history",
  onlyLogin,
  upload.single("image"),
  ProjectHistory.Add
);
projectHistory.put(
  "/api/project-history/:id",
  onlyLogin,
  upload.single("image"),
  ProjectHistory.Edit
);
projectHistory.delete("/api/project-history/:id", ProjectHistory.Del);

export default projectHistory;
