import onlyLogin from "../../src/middlewares/onlyLogin";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import UsersCol from "../../src/models/users";
import dotenv from "dotenv";
import UsersEntity from "../../src/entity/users";
import ResponseErr from "../../src/responses/error";
dotenv.config();

jest.mock("../../src/models/users");

describe("OnlyLogin", () => {
  it("should success", async () => {
    const data: UsersEntity = {
      _id: new mongoose.Types.ObjectId(),
      username: "testing",
      email: "testing@gmail.com",
      password: "123",
      created_at: "oke",
    };

    (UsersCol.findById as jest.Mock).mockResolvedValue(data);

    const token = jwt.sign(
      { _id: new mongoose.Types.ObjectId() },
      process.env.SECRET_KEY || "",
      {
        expiresIn: "1d",
      }
    );

    const req: Partial<Request> = {
      signedCookies: {
        secure: token,
      },
    };

    const next = jest.fn();
    await onlyLogin(req as Request, {} as Response, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0].length).toBe(0);
  });

  it("should error no token", async () => {
    const data: UsersEntity = {
      _id: new mongoose.Types.ObjectId(),
      username: "testing",
      email: "testing@gmail.com",
      password: "123",
      created_at: "oke",
    };

    (UsersCol.findById as jest.Mock).mockResolvedValue(data);

    const req: Partial<Request> = {
      signedCookies: {
        secure: undefined,
      },
    };

    const next = jest.fn();
    await onlyLogin(req as Request, {} as Response, next);

    expect(next).toHaveBeenCalledWith(new ResponseErr(401, "Unauthorized"));
    expect(next.mock.calls[0].length).toBe(1);
    expect(next.mock.calls[0][0] instanceof ResponseErr).toBe(true);
  });

  it("should error token expired", async () => {
    const data: UsersEntity = {
      _id: new mongoose.Types.ObjectId(),
      username: "testing",
      email: "testing@gmail.com",
      password: "123",
      created_at: "oke",
    };

    (UsersCol.findById as jest.Mock).mockResolvedValue(data);

    const token = jwt.sign(
      { _id: new mongoose.Types.ObjectId() },
      process.env.SECRET_KEY || "",
      {
        expiresIn: "0",
      }
    );

    const req: Partial<Request> = {
      signedCookies: {
        secure: token,
      },
    };

    const next = jest.fn();
    await onlyLogin(req as Request, {} as Response, next);

    expect(next).toHaveBeenCalledWith(
      new jwt.TokenExpiredError("jwt expired", new Date(Date.now()))
    );
    expect(next.mock.calls[0].length).toBe(1);
    expect(next.mock.calls[0][0] instanceof jwt.JsonWebTokenError).toBe(true);
  });

  it("should error object id invalid", async () => {
    const data: UsersEntity = {
      _id: new mongoose.Types.ObjectId(),
      username: "testing",
      email: "testing@gmail.com",
      password: "123",
      created_at: "oke",
    };

    (UsersCol.findById as jest.Mock).mockResolvedValue(data);

    const token = jwt.sign({ _id: "okjksj" }, process.env.SECRET_KEY || "", {
      expiresIn: "1d",
    });

    const req: Partial<Request> = {
      signedCookies: {
        secure: token,
      },
    };

    const next = jest.fn();
    await onlyLogin(req as Request, {} as Response, next);

    expect(next).toHaveBeenCalledWith(new ResponseErr(401, "Unauthorized"));
    expect(next.mock.calls[0].length).toBe(1);
    expect(next.mock.calls[0][0] instanceof ResponseErr).toBe(true);
  });

  it("should error user not found", async () => {
    (UsersCol.findById as jest.Mock).mockResolvedValue(null);

    const token = jwt.sign(
      { _id: new mongoose.Types.ObjectId() },
      process.env.SECRET_KEY || "",
      {
        expiresIn: "1d",
      }
    );

    const req: Partial<Request> = {
      signedCookies: {
        secure: token,
      },
    };

    const next = jest.fn();
    await onlyLogin(req as Request, {} as Response, next);

    expect(next).toHaveBeenCalledWith(new ResponseErr(401, "Unauthorized"));
    expect(next.mock.calls[0].length).toBe(1);
    expect(next.mock.calls[0][0] instanceof ResponseErr).toBe(true);
  });
});
