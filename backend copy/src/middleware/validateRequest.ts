import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: z.string().optional(),
  status: z.enum(['pending', 'in-progress', 'completed']).default('pending'),
  priority: z.enum(['low', 'medium', 'high']).default('medium')
});

export const validateCreateTask = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    req.body = createTaskSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: 'Validation Error',
        details: error.errors
      });
    } else {
      next(error);
    }
  }
};
