import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../util/response.js";
import { ObjectSchema } from "joi";

export const schemaValidation = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): Response | void => {
    try {
      const { error } = schema.validate({
        ...req.body,
        ...req.params,
        ...req.query,
      });
      if (error) {
        return errorResponse(res, 400, error.details[0].message);
      }
      next();
    } catch (error) {
      console.log("Validation Error:", error);
      return errorResponse(res, 500, "Internal server error during validation");
    }
  };
};
