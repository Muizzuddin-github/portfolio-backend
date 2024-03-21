import { Request, Response, NextFunction } from "express";
import ResponseErr from "../responses/error";
import jwtVerify from "../utility/jwtVerify";
import isObjectID from "../utility/isObjectID";
import decodedToken from "../utilitytype/jwt";
import UsersEntity from "../entity/users";
import UsersCol from "../models/users";

const onlyLogin = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.signedCookies.secure;
    if (!token) {
      throw new ResponseErr(401, "Unauthorized");
    }

    if (!process.env.SECRET_KEY) {
      throw new Error("Env Invalid");
    }

    const decoded: decodedToken = await jwtVerify(
      token,
      process.env.SECRET_KEY
    );

    if (!isObjectID(decoded._id)) {
      throw new ResponseErr(401, "Unauthorized");
    }

    const user: UsersEntity | null = await UsersCol.findById(decoded._id);

    if (!user) {
      throw new ResponseErr(401, "Unauthorized");
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default onlyLogin;
