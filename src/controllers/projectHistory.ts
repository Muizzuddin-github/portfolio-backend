import { Request, Response, NextFunction } from "express";
import { ResponseData, ResponseMsg } from "../responses/response";
import ResponseErr from "../responses/error";
import { ProjectHistoryReqBody } from "../requestbody/ProjectHistory";
import ProjectHistoryValidation from "../validation/projectHistory";
import axios from "axios";
import ResponseFreeImageHost from "../responses/freeImageHost";
import ProjectHistoryCol from "../models/projectHistory";
import { ProjectHistoryAdd } from "../responses/ProjectHistory";
import mongoose from "mongoose";
import ProjectHistoryEntity from "../entity/projectHistory";

class ProjectHistory {
  public static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data: ProjectHistoryEntity[] = await ProjectHistoryCol.find();
      const r: ResponseData<ProjectHistoryEntity> = {
        message: "All data project history",
        data: data,
      };
      res.status(200).json(r);
    } catch (err) {
      next(err);
    }
  }

  public static async Add(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        throw new ResponseErr(400, "Image required");
      }

      const val: ProjectHistoryReqBody = await ProjectHistoryValidation.add(
        req.body
      );

      const blob = new Blob([req.file.buffer], { type: req.file.mimetype });
      const formData = new FormData();
      formData.append("source", blob, req.file.originalname);

      const resWeb = await axios.post(
        "https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5",
        formData
      );

      const data: ResponseFreeImageHost = resWeb.data;
      const insert = new ProjectHistoryCol({
        title: val.title,
        image: data.image.url,
        description: val.description,
        technology: val.technology,
      });

      const n = await insert.save();
      const insertedID = n._id as mongoose.Types.ObjectId;

      const r: ProjectHistoryAdd = {
        message: "Add Project history successfully",
        insertedID: insertedID.toHexString(),
      };

      res.status(201).json(r);
    } catch (err) {
      next(err);
    }
  }
}

export default ProjectHistory;
