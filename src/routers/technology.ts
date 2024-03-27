import express from "express";
import Technology from "../controllers/technology";
import onlyLogin from "../middlewares/onlyLogin";
import upload from "../utility/multer";

const technology: express.Router = express.Router();

technology.get("/api/technology", Technology.GetAll);
technology.post(
  "/api/technology",
  onlyLogin,
  upload.single("logo"),
  Technology.Add
);
technology.put(
  "/api/technology/:id",
  onlyLogin,
  upload.single("logo"),
  Technology.Edit
);
technology.delete("/api/technology/:id", onlyLogin, Technology.Del);

export default technology;
