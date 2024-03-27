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
    await ProjectHistory.GetAll({} as Request, res as Response, next);

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

describe("Edit", () => {
  it("should error object id invalid", async () => {
    try {
      const req: Partial<Request> = {
        params: {
          id: "dsds",
        },
      };

      const next = jest.fn();
      await ProjectHistory.Edit(req as Request, {} as Response, next);
    } catch (err) {
      if (err instanceof ResponseErr) {
        expect(err.getStatusCode).toBe(400);
        expect(err.message).toBe("ID Invalid");
      }
    }
  });

  it("should error project history not found", async () => {
    try {
      (ProjectHistoryCol.findById as jest.Mock).mockResolvedValueOnce(null);

      const req: Partial<Request> = {
        params: {
          id: "660246b44c6f5adf110c756c",
        },
      };

      const next = jest.fn();
      await ProjectHistory.Edit(req as Request, {} as Response, next);
    } catch (err) {
      if (err instanceof ResponseErr) {
        expect(err.getStatusCode).toBe(400);
        expect(err.message).toBe("Project history not found");
      }
    }
  });

  it("should error required validation", async () => {
    (ProjectHistoryCol.findById as jest.Mock).mockResolvedValueOnce(true);

    const req: Partial<Request> = {
      body: {},
      params: {
        id: "660246b44c6f5adf110c756c",
      },
    };
    const next = jest.fn();
    await ProjectHistory.Edit(req as Request, {} as Response, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0] instanceof Joi.ValidationError).toBe(true);
  });

  it("should upload file not found success", async () => {
    (ProjectHistoryCol.findById as jest.Mock).mockResolvedValueOnce(true);

    (ProjectHistoryCol.updateOne as jest.Mock).mockResolvedValueOnce(true);

    const req: Partial<Request> = {
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
      params: {
        id: "660246b44c6f5adf110c756c",
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();
    await ProjectHistory.Edit(req as Request, res as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it("should success", async () => {
    const resWeb = {
      data: {
        image: {
          url: "kuy",
        },
      },
    };

    (ProjectHistoryCol.findById as jest.Mock).mockResolvedValueOnce(true);
    (axios.post as jest.Mock).mockResolvedValueOnce(resWeb);
    (ProjectHistoryCol.updateOne as jest.Mock).mockResolvedValueOnce(true);

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
      params: {
        id: "660246b44c6f5adf110c756c",
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();
    await ProjectHistory.Edit(req as Request, res as Response, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
});

describe("Del", () => {
  it("should error object id invalid", async () => {
    try {
      const req: Partial<Request> = {
        params: {
          id: "sds",
        },
      };

      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await ProjectHistory.Del(req as Request, res as Response, next);
    } catch (err) {
      if (err instanceof ResponseErr) {
        expect(err.getStatusCode).toBe(400);
        expect(err.message).toBe("ID Invalid");
      }
    }
  });

  it("should error not found", async () => {
    try {
      (ProjectHistoryCol.deleteOne as jest.Mock).mockResolvedValueOnce({
        deleteCount: 0,
      });

      const req: Partial<Request> = {
        params: {
          id: "660246b44c6f5adf110c756c",
        },
      };

      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      await ProjectHistory.Del(req as Request, res as Response, next);
    } catch (err) {
      if (err instanceof ResponseErr) {
        expect(err.getStatusCode).toBe(404);
        expect(err.message).toBe("Project history not found");
      }
    }
  });

  it("should success", async () => {
    (ProjectHistoryCol.deleteOne as jest.Mock).mockResolvedValueOnce({
      deleteCount: 1,
    });

    const req: Partial<Request> = {
      params: {
        id: "660246b44c6f5adf110c756c",
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await ProjectHistory.Del(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });
});
