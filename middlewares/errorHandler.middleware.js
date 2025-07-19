import { constants } from "../constants.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = req.statusCode ? res.statusCode : 500;

  switch (statusCode) {
    case constants.NOT_FOUND:
      res.json({
        title: "NOT FOUND",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case constants.VALIDATION:
      res.json({
        title: "VALIDATION ERROR",
        message: err.message,
        stackTrace: err.stack,
      });
    case constants.FORBIDDEN:
      res.json({
        title: "FORBIDDEN",
        message: err.message,
        stackTrace: err.stack,
      });
    case constants.UNAUTHORISED:
      res.json({
        title: "UNAUTHORISED",
        message: err.message,
        stackTrace: err.stack,
      });
    default:
      res.json({
        title: "something went wrong",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
  }
  next();
};

export { errorHandler };
