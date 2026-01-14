import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const cookieToken = req.cookies.accessToken;

  const token = authHeader?.split(" ")[1] || cookieToken;

  if (!token) {
    return next(createError(401, "You are not authenticated"));
  }

  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return next(createError(403, "Token is not valid"));
    }

    req.user = payload;
    req.isSeller = payload.isSeller;
    next();
  });
};
