import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface IJwtPayload extends JwtPayload {
  userId: string;
  email: string;
}

export interface AuthRequest extends Request {
  user?: IJwtPayload;
}
