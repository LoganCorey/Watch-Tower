import { Request, Response, NextFunction } from "express";

/**
 * Generic error handler function
 * @param err error message
 * @param req express request object
 * @param res  express response object
 * @param next next function
 */
const errorHandler = (
  err: string,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500);
  res.render("error", { error: err });
};

export default errorHandler;
