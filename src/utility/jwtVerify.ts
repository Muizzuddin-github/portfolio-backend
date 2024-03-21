import jwt from "jsonwebtoken";
import decodedToken from "../utilitytype/jwt";

const jwtVerify = (token: string, key: string): Promise<decodedToken> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, key, function (err, decoded) {
      if (err) {
        reject(err);
        return;
      }

      const d: decodedToken = decoded as decodedToken;
      resolve(d);
      return;
    });
  });
};

export default jwtVerify;
