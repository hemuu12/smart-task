import { Request, Response, NextFunction } from 'express';
import prisma from '../services/prismaClient';
import { generateTaskSummary } from '../services/geminiService';
import { generateEmbedding } from '../services/vectorService';
import { AuthRequest } from '../middleware/auth';

export const createTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, status, priority } = req.body;
    const userId = req.userId!;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        userId,
        embedding: null
      }
    });

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId!;

    const tasks = await prisma.task.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        priority: true,
        createdAt: true,
        updatedAt: true
      }
    });

    res.json({
      success: true,
      data: tasks,
      count: tasks.length
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority } = req.body;
    const userId = req.userId!;

    const task = await prisma.task.findUnique({
      where: { id }
    });

    if (!task) {
      res.status(404).json({
        success: false,
        error: 'Task not found'
      });
      return;
    }

    if (task.userId !== userId) {
      res.status(403).json({
        success: false,
        error: 'Not authorized to update this task'
      });
      return;
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        status,
        priority
      }
    });

    res.json({
      success: true,
      data: updatedTask
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.userId!;

    const task = await prisma.task.findUnique({
      where: { id }
    });

    if (!task) {
      res.status(404).json({
        success: false,
        error: 'Task not found'
      });
      return;
    }

    if (task.userId !== userId) {
      res.status(403).json({
        success: false,
        error: 'Not authorized to delete this task'
      });
      return;
    }

    await prisma.task.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getTaskSummary = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.userId!;

    const tasks = await prisma.task.findMany({
      where: {
        userId,
        status: {
          not: 'completed'
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const summary = await generateTaskSummary(tasks);

    res.json({
      success: true,
      data: {
        summary,
        taskCount: tasks.length,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    next(error);
  }
};
