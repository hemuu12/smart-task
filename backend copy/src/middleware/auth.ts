import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  userId?: string;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (!req.session || !req.session.userId) {
    res.status(401).json({
      success: false,
      error: 'Authentication required',
      message: 'Please login to continue'
    });
    return;
  }

  req.userId = req.session.userId;
  next();
};
