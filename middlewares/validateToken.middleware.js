import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.header.Authorization || req.header.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401);
      throw new Error("User is not Authorised or Token was not found");
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        res.status(401);
        throw new Error("User is not Authorized");
      }
      req.user = decoded.user;
      console.log(req.user);
      console.log(token);
      next();
    });
  } else {
    res.status(401);
    throw new Error("No Authorization header or no Bearer token found");
  }
});

export default validateToken;
