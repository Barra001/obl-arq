import { Request, Response } from "express";
import { AppException } from "./app.exception";


export class AppExceptionFilter {
  static catch(error: Error, req: Request, res: Response) : void{
    let status = 500;
    if (error instanceof AppException) {
      status = (error as AppException).httpStatusCode;
    }

    res.status(status).json({
      message: error.message,
      statusCode: status,
      path: req.url,
    });
  }
}
