import express from "express";
import ProjectHistory from "../controllers/projectHistory";

const projectHistory: express.Router = express.Router();

projectHistory.get("/api/project-history", ProjectHistory.getAll);

export default projectHistory;
