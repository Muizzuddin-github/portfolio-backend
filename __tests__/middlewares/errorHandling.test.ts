import errorHandling from "../../src/middlewares/errorHandling";
import { Request, Response } from "express";
import ResponseErr from "../../src/responses/error";
import { ResponseErrors } from "../../src/responses/response";
import Joi from "joi";
import jwt from "jsonwebtoken";
import multer from "multer";

describe("ErrorHandling", () => {
  it("should success", () => {
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    errorHandling(null, {} as Request, res as Response, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith();
  });

  it("should ResponseErr", () => {
    const err: Error = new ResponseErr(400, "not found");
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    errorHandling(err, {} as Request, res as Response, next);

    const r: ResponseErrors = {
      errors: ["not found"],
    };

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(r);
    expect(next).not.toHaveBeenCalledWith();
  });

  it("should joi validation error", () => {
    const err = new Joi.ValidationError("required", [], "");

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    errorHandling(err, {} as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errors: ["required"],
    });
    expect(next).not.toHaveBeenCalledWith();
  });

  it("should jsonwebtoken error", () => {
    const err = new jwt.JsonWebTokenError("token expired");

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    errorHandling(err, {} as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      errors: ["token expired"],
    });
    expect(next).not.toHaveBeenCalledWith();
  });

  it("should multer error logo required", () => {
    const err = new multer.MulterError("LIMIT_UNEXPECTED_FILE", "error");

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    errorHandling(err, {} as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errors: ["Logo field required"],
    });
    expect(next).not.toHaveBeenCalledWith();
  });

  it("should multer error ", () => {
    const err = new multer.MulterError("LIMIT_FIELD_COUNT", "error");

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    errorHandling(err, {} as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errors: ["Too many fields"],
    });
    expect(next).not.toHaveBeenCalledWith();
  });

  it("should Internal server error", () => {
    const err: Error = new Error("server down");
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    errorHandling(err, {} as Request, res as Response, next);

    const r: ResponseErrors = {
      errors: ["server down"],
    };

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(r);
    expect(next).not.toHaveBeenCalledWith();
  });
});
