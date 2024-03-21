import Joi from "joi";
import Auth from "../../src/controllers/auth";
import { Request, Response } from "express";
import UsersCol from "../../src/models/users";
import ResponseErr from "../../src/responses/error";
import UsersEntity from "../../src/entity/users";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

jest.mock("../../src/models/users");
jest.mock("bcrypt");

describe("Register", () => {
  beforeAll(function () {});

  it("should register successfully", async () => {
    const req: Partial<Request> = {
      body: {
        username: "username",
        email: "email@example.com",
        password: "password",
      },
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await Auth.register(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Register successfully" });
  });

  it("should validation error required", async () => {
    const req: Partial<Request> = {
      body: {
        username: " ",
        email: " ",
        password: " ",
      },
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();
    try {
      await Auth.register(req as Request, res as Response, next);
    } catch (err) {
      if (err instanceof Joi.ValidationError) {
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
      }
    }
  });

  it("should error email already exists", async () => {
    const data: UsersEntity = {
      _id: new mongoose.Types.ObjectId(),
      username: "testing",
      email: "testing@gmail.com",
      password: "123",
      created_at: new Date().toISOString(),
    };

    (UsersCol.findOne as jest.Mock).mockResolvedValue(data);

    const req: Partial<Request> = {
      body: {
        username: "testing",
        email: "testing@gmail.com",
        password: "123",
      },
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();
    await Auth.register(req as Request, res as Response, next);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(
      new ResponseErr(400, "Email already exists")
    );
  });
});

describe("Login", () => {
  it("should success", async () => {
    const data: UsersEntity = {
      _id: new mongoose.Types.ObjectId(),
      username: "testing",
      email: "testing@gmail.com",
      password: "123",
      created_at: "time",
    };

    (UsersCol.findOne as jest.Mock).mockResolvedValue(data);
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);

    const req: Partial<Request> = {
      body: {
        email: "testing@gmail.com",
        password: "123",
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    };

    const next = jest.fn();
    await Auth.login(req as Request, res as Response, next);

    expect(res.cookie).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Login successfully",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should validation error required", async () => {
    const req: Partial<Request> = {
      body: {
        email: " ",
        password: " ",
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    await Auth.login(req as Request, res as Response, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0] instanceof Joi.ValidationError).toBe(true);
  });

  it("should error email not found", async () => {
    (UsersCol.findOne as jest.Mock).mockResolvedValueOnce(null);

    const req: Partial<Request> = {
      body: {
        email: "testing@gmail.com",
        password: "123",
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    await Auth.login(req as Request, res as Response, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0] instanceof ResponseErr).toBe(true);
  });

  it("should error password wrong", async () => {
    const d: UsersEntity = {
      _id: new mongoose.Types.ObjectId(),
      username: "testing",
      email: "testing@gmail.com",
      password: "123",
      created_at: "oke",
    };
    (UsersCol.findOne as jest.Mock).mockResolvedValueOnce(d);
    (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

    const req: Partial<Request> = {
      body: {
        email: "testing@gmail.com",
        password: "123",
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    await Auth.login(req as Request, res as Response, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0] instanceof ResponseErr).toBe(true);
  });
});

describe("Logout", () => {
  it("should success", () => {
    const res: Partial<Response> = {
      cookie: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Auth.logout({} as Request, res as Response);

    expect(res.cookie).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
});

describe("Islogin", () => {
  it("should success", async () => {
    const data: UsersEntity = {
      _id: new mongoose.Types.ObjectId(),
      username: "testing",
      email: "testing@gmail.com",
      password: "1234",
      created_at: new Date().toISOString(),
    };

    (UsersCol.findOne as jest.Mock).mockResolvedValueOnce(data);

    if (!process.env.SECRET_KEY) {
      console.log("Env invalid");
      return;
    }

    const token: string = jwt.sign(
      { _id: new mongoose.Types.ObjectId() },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    const req: Partial<Request> = {
      signedCookies: {
        secure: token,
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    await Auth.isLogin(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "user is login" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should error token undefined", async () => {
    if (!process.env.SECRET_KEY) {
      console.log("Env invalid");
      return;
    }

    const req: Partial<Request> = {
      signedCookies: {},
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    await Auth.isLogin(req as Request, res as Response, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0] instanceof ResponseErr).toBe(true);
  });

  it("should error token expired", async () => {
    if (!process.env.SECRET_KEY) {
      console.log("Env invalid");
      return;
    }

    const token: string = jwt.sign(
      { _id: new mongoose.Types.ObjectId() },
      process.env.SECRET_KEY,
      {
        expiresIn: "0",
      }
    );

    const req: Partial<Request> = {
      signedCookies: {
        secure: token,
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    await Auth.isLogin(req as Request, res as Response, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0] instanceof jwt.JsonWebTokenError).toBe(true);
  });

  it("should error token dont have object id", async () => {
    if (!process.env.SECRET_KEY) {
      console.log("Env invalid");
      return;
    }

    const token: string = jwt.sign({ _id: "dsd" }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const req: Partial<Request> = {
      signedCookies: {
        secure: token,
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    await Auth.isLogin(req as Request, res as Response, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0] instanceof ResponseErr).toBe(true);
  });

  it("should error user not found", async () => {
    (UsersCol.findOne as jest.Mock).mockResolvedValue(null);

    if (!process.env.SECRET_KEY) {
      console.log("Env invalid");
      return;
    }

    const token: string = jwt.sign(
      { _id: new mongoose.Types.ObjectId() },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    const req: Partial<Request> = {
      signedCookies: {
        secure: token,
      },
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    await Auth.isLogin(req as Request, res as Response, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0] instanceof ResponseErr).toBe(true);
  });
});
