import { Request, Response, NextFunction } from "express";
import { ResponseErrors } from "../responses/response";
import ResponseErr from "../responses/error";
import Joi from "joi";
import jwt from "jsonwebtoken";
import multer from "multer";
import axios from "axios";

function errorHandling(
  err: Error | null,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ResponseErr) {
    const r: ResponseErrors = {
      errors: [err.message],
    };
    res.status(err.getStatusCode).json(r);
    return;
  } else if (err instanceof Joi.ValidationError) {
    const r: ResponseErrors = {
      errors: err.message.split("."),
    };

    res.status(400).json(r);
    return;
  } else if (err instanceof jwt.JsonWebTokenError) {
    const r: ResponseErrors = {
      errors: err.message.split("."),
    };

    res.status(401).json(r);
    return;
  } else if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      const r: ResponseErrors = {
        errors: ["Logo field required"],
      };

      res.status(400).json(r);
      return;
    }
    const r: ResponseErrors = {
      errors: err.message.split("."),
    };

    res.status(400).json(r);
    return;
  } else if (err instanceof axios.AxiosError) {
    const r: ResponseErrors = {
      errors: [err.response?.data.error.message || err.message],
    };

    res.status(err.response?.status || 500).json(r);
    return;
  }
  const r: ResponseErrors = {
    errors: [err.message],
  };
  res.status(500).json(r);
}

export default errorHandling;
