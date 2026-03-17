import { Response } from "express";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export const successResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T,
): Response<ApiResponse<T>> => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
): Response<ApiResponse<null>> => {
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};
