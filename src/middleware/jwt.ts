import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config";
import { CustomRequest } from "../utils/customRequest";



export interface JwtPayload {
  user: {
    id: string;
  };
}

export const protect = (req:CustomRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1];


  if (!token) {
    res.status(401).json({ message: 'Authorization denied' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    const decodeUser = decoded.user.id;

    req.user = {id: decodeUser};
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};
