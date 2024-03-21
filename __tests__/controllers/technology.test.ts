import Technology from "../../src/controllers/technology";
import TechnologyCol from "../../src/models/technology";
import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { Readable } from "stream";
import mongoose from "mongoose";
import ResponseErr from "../../src/responses/error";
import Joi from "joi";

jest.mock("../../src/models/technology");
jest.mock("axios");

describe("GetAll", () => {
  it("should success", async () => {
    (TechnologyCol.find as jest.Mock).mockResolvedValue([]);

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next: NextFunction = jest.fn();

    await Technology.getAll({} as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "All data technology",
      data: [],
    });
  });
});

describe("Add", () => {
  it("should success", async () => {
    const resWeb = {
      data: {
        image: {
          url: "kuy",
        },
      },
    };

    (axios.post as jest.Mock).mockResolvedValueOnce(resWeb);

    (TechnologyCol.prototype.save as jest.Mock).mockResolvedValue({
      _id: new mongoose.Types.ObjectId(),
      name: "ke",
      logo: "oke",
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
        name: "kuy",
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();
    await Technology.Add(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });

  it("should error img file required", async () => {
    const resWeb = {
      data: {
        image: {
          url: "kuy",
        },
      },
    };

    (axios.post as jest.Mock).mockResolvedValueOnce(resWeb);

    (TechnologyCol.prototype.save as jest.Mock).mockResolvedValue({
      _id: new mongoose.Types.ObjectId(),
      name: "ke",
      logo: "oke",
    });

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();
    await Technology.Add({} as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(
      new ResponseErr(400, "Img file required with field 'logo'")
    );
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("should error validation name required", async () => {
    const resWeb = {
      data: {
        image: {
          url: "kuy",
        },
      },
    };

    (axios.post as jest.Mock).mockResolvedValueOnce(resWeb);

    (TechnologyCol.prototype.save as jest.Mock).mockResolvedValue({
      _id: new mongoose.Types.ObjectId(),
      name: "ke",
      logo: "oke",
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
      body: {},
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();
    await Technology.Add(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});

describe("Edit no file upload", () => {
  it("should success", async () => {
    const resWeb = {
      data: {
        image: {
          url: "kuy",
        },
      },
    };

    const result: Partial<mongoose.UpdateWriteOpResult> = {
      matchedCount: 1,
    };

    (TechnologyCol.updateOne as jest.Mock).mockResolvedValue(result);

    const req: Partial<Request> = {
      body: {
        name: "kuy",
      },
      params: {
        id: new mongoose.Types.ObjectId().toHexString(),
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();
    await Technology.Edit(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Update technology successfully",
    });
  });

  it("should error not found", async () => {
    const result: Partial<mongoose.UpdateWriteOpResult> = {
      matchedCount: 0,
    };

    (TechnologyCol.updateOne as jest.Mock).mockResolvedValue(result);

    const req: Partial<Request> = {
      body: {
        name: "kuy",
      },
      params: {
        id: new mongoose.Types.ObjectId().toHexString(),
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();
    await Technology.Edit(req as Request, res as Response, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(
      new ResponseErr(404, "Technology not found")
    );
  });

  it("should error object id invalid", async () => {
    const result: Partial<mongoose.UpdateWriteOpResult> = {
      matchedCount: 0,
    };

    (TechnologyCol.updateOne as jest.Mock).mockResolvedValue(result);

    const req: Partial<Request> = {
      body: {
        name: "kuy",
      },
      params: {
        id: "98989",
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();
    await Technology.Edit(req as Request, res as Response, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new ResponseErr(400, "ID invalid"));
  });

  it("should error required body", async () => {
    const result: Partial<mongoose.UpdateWriteOpResult> = {
      matchedCount: 0,
    };

    (TechnologyCol.updateOne as jest.Mock).mockResolvedValue(result);

    const req: Partial<Request> = {
      body: {},
      params: {
        id: new mongoose.Types.ObjectId().toHexString(),
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();
    await Technology.Edit(req as Request, res as Response, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0] instanceof Joi.ValidationError).toBe(true);
  });
});

describe("Edit with upload file", () => {
  it("should success", async () => {
    const resWeb = {
      data: {
        image: {
          url: "kuy",
        },
      },
    };

    (axios.post as jest.Mock).mockResolvedValueOnce(resWeb);

    const result: Partial<mongoose.UpdateWriteOpResult> = {
      matchedCount: 1,
    };

    (TechnologyCol.updateOne as jest.Mock).mockResolvedValue(result);
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
        name: "kuy",
      },
      params: {
        id: new mongoose.Types.ObjectId().toHexString(),
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();
    await Technology.Edit(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it("should error not found", async () => {
    const resWeb = {
      data: {
        image: {
          url: "kuy",
        },
      },
    };

    (axios.post as jest.Mock).mockResolvedValueOnce(resWeb);

    const result: Partial<mongoose.UpdateWriteOpResult> = {
      matchedCount: 0,
    };

    (TechnologyCol.updateOne as jest.Mock).mockResolvedValue(result);
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
        name: "kuy",
      },
      params: {
        id: new mongoose.Types.ObjectId().toHexString(),
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();
    await Technology.Edit(req as Request, res as Response, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  it("should error id invalid", async () => {
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
        name: "kuy",
      },
      params: {
        id: "sdfds",
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();
    await Technology.Edit(req as Request, res as Response, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new ResponseErr(400, "ID invalid"));
  });

  it("should error name required", async () => {
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
      params: {
        id: new mongoose.Types.ObjectId().toHexString(),
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();
    await Technology.Edit(req as Request, res as Response, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0] instanceof Joi.ValidationError);
  });
});

describe("Del", () => {
  it("should success", async () => {
    const result: Partial<mongoose.mongo.DeleteResult> = {
      deletedCount: 1,
    };

    (TechnologyCol.deleteOne as jest.Mock).mockResolvedValueOnce(result);

    const req: Partial<Request> = {
      params: {
        id: new mongoose.Types.ObjectId().toHexString(),
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    await Technology.Del(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Delete technology successfully",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should error object id invalid", async () => {
    const req: Partial<Request> = {
      params: {
        id: "dsd",
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    await Technology.Del(req as Request, res as Response, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new ResponseErr(400, "ID invalid"));
  });

  it("should error not found", async () => {
    const result: Partial<mongoose.mongo.DeleteResult> = {
      deletedCount: 0,
    };

    (TechnologyCol.deleteOne as jest.Mock).mockResolvedValueOnce(result);

    const req: Partial<Request> = {
      params: {
        id: new mongoose.Types.ObjectId().toHexString(),
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    await Technology.Del(req as Request, res as Response, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(
      new ResponseErr(404, "Technology not found")
    );
  });
});
