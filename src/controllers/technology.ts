import { Request, Response, NextFunction, response } from "express";
import TechnologyEntity from "../entity/technology";
import TechnologyCol from "../models/technology";
import { ResponseData, ResponseMsg } from "../responses/response";
import axios from "axios";
import ResponseFreeImageHost from "../responses/freeImageHost";
import ResponseErr from "../responses/error";
import TechnologyValidation from "../validation/technology";
import { TechnologyAdd } from "../responses/technology";
import mongoose from "mongoose";
import isObjectID from "../utility/isObjectID";

class Technology {
  public static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data: TechnologyEntity[] = await TechnologyCol.find();

      const r: ResponseData<Technology> = {
        message: "All data technology",
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
        throw new ResponseErr(400, "Img file required with field 'logo'");
      }

      const val = await TechnologyValidation.add(req.body);

      const blobData = new Blob([req.file.buffer], { type: req.file.mimetype });
      const formData = new FormData();
      formData.append("source", blobData, req.file.originalname);

      const resWeb = await axios.post(
        "https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5",
        formData
      );

      const data: ResponseFreeImageHost = resWeb.data;

      const insert = new TechnologyCol({
        name: val.name,
        logo: data.image.url,
      });

      const n = await insert.save();
      const insertedID = n._id as mongoose.Types.ObjectId;

      const r: TechnologyAdd = {
        message: "Add technology successfully",
        insertedID: insertedID.toHexString(),
      };
      res.status(201).json(r);
    } catch (err) {
      next(err);
    }
  }

  public static async Edit(req: Request, res: Response, next: NextFunction) {
    try {
      const idTech: string = req.params.id;

      if (!isObjectID(idTech)) {
        throw new ResponseErr(400, "ID invalid");
      }

      const val = await TechnologyValidation.add(req.body);

      if (!req.file) {
        const result: mongoose.UpdateWriteOpResult =
          await TechnologyCol.updateOne(
            { _id: idTech },
            {
              name: val.name,
            }
          );

        if (result.matchedCount === 0) {
          throw new ResponseErr(404, "Technology not found");
        }

        const r: ResponseMsg = {
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

      const resWeb = await axios.post(
        "https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5",
        formData
      );

      const data: ResponseFreeImageHost = resWeb.data;

      const result: mongoose.UpdateWriteOpResult =
        await TechnologyCol.updateOne(
          { _id: idTech },
          {
            name: val.name,
            logo: data.image.url,
          }
        );

      if (result.matchedCount === 0) {
        throw new ResponseErr(404, "Technology not found");
      }

      const r: ResponseMsg = {
        message: "Update technology successfully",
      };

      res.status(200).json(r);
    } catch (err) {
      next(err);
    }
  }

  public static async Del(req: Request, res: Response, next: NextFunction) {
    try {
      const idTech: string = req.params.id;
      if (!isObjectID(idTech)) {
        throw new ResponseErr(400, "ID invalid");
      }

      const result: mongoose.mongo.DeleteResult = await TechnologyCol.deleteOne(
        { _id: idTech }
      );

      if (result.deletedCount === 0) {
        throw new ResponseErr(404, "Technology not found");
      }

      const r: ResponseMsg = {
        message: "Delete technology successfully",
      };
      res.status(200).json(r);
    } catch (err) {
      next(err);
    }
  }
}

export default Technology;
