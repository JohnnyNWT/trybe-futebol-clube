import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'acai';

class TokenValidation {
  verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      jwt.verify(authorization, secretKey);
      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ message: 'Token must be a valid token' });
      }
    }
  };
}

export default new TokenValidation();
