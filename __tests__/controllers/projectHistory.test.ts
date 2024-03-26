import ProjectHistory from "../../src/controllers/projectHistory";
import ProjectHistoryCol from "../../src/models/projectHistory";
import { Response, NextFunction, Request } from "express";
import ResponseErr from "../../src/responses/error";
import { Readable } from "stream";
import Joi from "joi";
import axios from "axios";
import mongoose from "mongoose";

jest.mock("../../src/models/projectHistory");
jest.mock("axios");

describe("GetAll", () => {
  it("should success", async () => {
    (ProjectHistoryCol.find as jest.Mock).mockResolvedValue([]);

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    const next: NextFunction = jest.fn();
    await ProjectHistory.getAll({} as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "All data project history",
      data: [],
    });
  });
});

describe("Add", () => {
  it("should error image required", async () => {
    try {
      const next = jest.fn();
      await ProjectHistory.Add({} as Request, {} as Response, next);
    } catch (err) {
      if (err instanceof ResponseErr) {
        expect(err.getStatusCode).toBe(400);
        expect(err.message).toBe("Image required");
      }
    }
  });

  it("should error required validation", async () => {
    const req: Partial<Request> = {
      file: {
        filename: "txt",
        fieldname: "txt",
        originalname: "txt.jpg",
        mimetype: "image/jpg",
        destination: "",
        path: "",
        size: 100,
        stream: Readable.from([]),
        encoding: "",
        buffer: Buffer.from("okeh", "utf8"),
      },
      body: {},
    };
    const next = jest.fn();
    await ProjectHistory.Add(req as Request, {} as Response, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0] instanceof Joi.ValidationError).toBe(true);
  });

  it("should error axios", async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce(new axios.AxiosError());

    const req: Partial<Request> = {
      file: {
        filename: "txt",
        fieldname: "txt",
        originalname: "txt.jpg",
        mimetype: "image/jpg",
        destination: "",
        path: "",
        size: 100,
        stream: Readable.from([]),
        encoding: "",
        buffer: Buffer.from("okeh", "utf8"),
      },
      body: {
        title: "okeh gas",
        description: "aa",
        technology: [
          {
            name: "as",
            logo: "dsds",
          },
        ],
      },
    };
    const next = jest.fn();
    await ProjectHistory.Add(req as Request, {} as Response, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0] instanceof axios.AxiosError).toBe(true);
  });

  it("should success", async () => {
    const resWeb = {
      data: {
        image: {
          url: "kuy",
        },
      },
    };

    (axios.post as jest.Mock).mockResolvedValueOnce(resWeb);
    (ProjectHistoryCol.prototype.save as jest.Mock).mockResolvedValueOnce({
      _id: new mongoose.Types.ObjectId(),
    });

    const req: Partial<Request> = {
      file: {
        filename: "txt",
        fieldname: "txt",
        originalname: "txt.jpg",
        mimetype: "image/jpg",
        destination: "",
        path: "",
        size: 100,
        stream: Readable.from([]),
        encoding: "",
        buffer: Buffer.from("okeh", "utf8"),
      },
      body: {
        title: "okeh gas",
        description: "aa",
        technology: [
          {
            name: "as",
            logo: "dsds",
          },
        ],
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    await ProjectHistory.Add(req as Request, res as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });
});
