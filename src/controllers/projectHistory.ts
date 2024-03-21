import { Request, Response, NextFunction } from "express";
import { ResponseMsg } from "../responses/response";

class ProjectHistory {
  public static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const r: ResponseMsg = {
        message: "all data project history",
      };
      res.status(200).json(r);
    } catch (err) {
      next(err);
    }
  }
}

export default ProjectHistory;
