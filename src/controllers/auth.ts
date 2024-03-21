import { Request, Response, NextFunction } from "express";
import { ResponseMsg } from "../responses/response";
import AuthValidation from "../validation/auth";
import bcrypt from "bcrypt";
import { Login, Register } from "../requestbody/users";
import UsersCol from "../models/users";
import ResponseErr from "../responses/error";
import UsersEntity from "../entity/users";
import jwt from "jsonwebtoken";
import jwtVerify from "../utility/jwtVerify";
import isObjectID from "../utility/isObjectID";

class Auth {
  public static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const val: Register = await AuthValidation.register(req.body);

      const checkEmail: UsersEntity | null = await UsersCol.findOne({
        email: val.email,
      });

      if (checkEmail) {
        throw new ResponseErr(400, "Email already exists");
      }

      const salt: string = await bcrypt.genSalt(10);
      const hashPassword: string = await bcrypt.hash(val.password, salt);
      val.password = hashPassword;

      const insert = new UsersCol(val);
      await insert.save();

      const r: ResponseMsg = {
        message: "Register successfully",
      };
      res.status(200).json(r);
    } catch (err) {
      next(err);
    }
  }

  public static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const val: Login = await AuthValidation.login(req.body);

      const user: UsersEntity | null = await UsersCol.findOne({
        email: val.email,
      });

      if (!user) {
        throw new ResponseErr(400, "Check your email or password");
      }

      const checkPassword: boolean = await bcrypt.compare(
        val.password,
        user.password
      );

      if (!checkPassword) {
        throw new ResponseErr(400, "Check your email or password");
      }

      if (!process.env.SECRET_KEY) {
        throw new Error("Env Invalid");
      }

      const token: string = jwt.sign(
        { _id: user._id },
        process.env.SECRET_KEY,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("secure", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
        signed: true,
        priority: "high",
      });

      const r: ResponseMsg = {
        message: "Login successfully",
      };
      res.status(200).json(r);
    } catch (err) {
      next(err);
    }
  }

  public static logout(req: Request, res: Response) {
    res.cookie("secure", "", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 0,
      signed: true,
      priority: "high",
    });

    const r: ResponseMsg = {
      message: "Logout successfully",
    };
    res.status(200).json(r);
  }

  public static async isLogin(req: Request, res: Response, next: NextFunction) {
    try {
      const token: string | undefined = req.signedCookies.secure;

      if (!token) {
        throw new ResponseErr(401, "Unauthorized");
      }

      if (!process.env.SECRET_KEY) {
        throw new Error("Env invalid");
      }

      const decoded = await jwtVerify(token, process.env.SECRET_KEY);

      if (!isObjectID(decoded._id)) {
        throw new ResponseErr(401, "Unathorized");
      }

      const user: UsersEntity | null = await UsersCol.findOne({
        _id: decoded._id,
      });

      if (!user) {
        throw new ResponseErr(401, "Unathorized");
      }

      res.status(200).json({ message: "user is login" });
    } catch (err) {
      next(err);
    }
  }
}

export default Auth;
