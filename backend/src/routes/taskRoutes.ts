import { Router } from 'express';
import { createTask, getTasks, updateTask, deleteTask, getTaskSummary } from '../controllers/taskController';
import { validateCreateTask } from '../middleware/validateRequest';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.post('/', validateCreateTask, createTask);
router.get('/', getTasks);
router.put('/:id', validateCreateTask, updateTask);
router.delete('/:id', deleteTask);
router.get('/summary', getTaskSummary);

export default router;
