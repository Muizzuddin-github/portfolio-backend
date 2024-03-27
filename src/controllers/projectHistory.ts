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
import isObjectID from "../utility/isObjectID";

class ProjectHistory {
  public static async GetAll(req: Request, res: Response, next: NextFunction) {
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

      const val: ProjectHistoryReqBody = await ProjectHistoryValidation.data(
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
        message: "Add project history successfully",
        insertedID: insertedID.toHexString(),
      };

      res.status(201).json(r);
    } catch (err) {
      next(err);
    }
  }

  public static async Edit(req: Request, res: Response, next: NextFunction) {
    try {
      if (!isObjectID(req.params.id)) {
        throw new ResponseErr(400, "ID Invalid");
      }

      const checkData = await ProjectHistoryCol.findById(req.params.id);
      if (!checkData) {
        throw new ResponseErr(404, "Project history not found");
      }

      const val: ProjectHistoryReqBody = await ProjectHistoryValidation.data(
        req.body
      );

      if (!req.file) {
        await ProjectHistoryCol.updateOne(
          { _id: req.params.id },
          {
            $set: {
              title: val.title,
              description: val.description,
              technology: val.technology,
            },
          }
        );

        const r: ResponseMsg = {
          message: "Update project history successfully",
        };
        res.status(200).json(r);
        return;
      }

      const blob = new Blob([req.file.buffer], { type: req.file.mimetype });
      const formData = new FormData();
      formData.append("source", blob);

      const resWeb = await axios.post(
        "https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5",
        formData
      );

      const data: ResponseFreeImageHost = resWeb.data;

      await ProjectHistoryCol.updateOne(
        { _id: req.params.id },
        {
          $set: {
            title: val.title,
            image: data.image.url,
            description: val.description,
            technology: val.technology,
          },
        }
      );

      const r: ResponseMsg = {
        message: "Update project history successfully",
      };
      res.status(200).json(r);
    } catch (err) {
      next(err);
    }
  }

  public static async Del(req: Request, res: Response, next: NextFunction) {
    try {
      if (!isObjectID(req.params.id)) {
        throw new ResponseErr(400, "ID Invalid");
      }

      const result: mongoose.mongo.DeleteResult =
        await ProjectHistoryCol.deleteOne({ _id: req.params.id });

      if (result.deletedCount === 0) {
        throw new ResponseErr(404, "Project history not found");
      }

      const r: ResponseMsg = {
        message: "Delete project history successfully",
      };
      res.status(200).json(r);
    } catch (err) {
      next(err);
    }
  }
}

export default ProjectHistory;
