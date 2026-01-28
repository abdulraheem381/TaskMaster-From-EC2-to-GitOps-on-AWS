import express from 'express';
import { body, param, query } from 'express-validator';
import { authenticate } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validationMiddleware.js';
import {
  createTask,
  getTask,
  updateTask,
  deleteTask,
  getProjectTasks,
} from '../controllers/taskController.js';

const router = express.Router();

router.post(
  '/',
  authenticate,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('projectId').isInt().withMessage('Invalid project ID'),
    body('status').optional().isIn(['TO_DO', 'IN_PROGRESS', 'DONE']),
  ],
  validateRequest,
  createTask
);

router.get('/project/:projectId', authenticate, getProjectTasks);

router.get(
  '/:id',
  authenticate,
  [param('id').isInt().withMessage('Invalid task ID')],
  validateRequest,
  getTask
);

router.put(
  '/:id',
  authenticate,
  [
    param('id').isInt().withMessage('Invalid task ID'),
    body('title').optional().notEmpty(),
    body('description').optional(),
    body('status').optional().isIn(['TO_DO', 'IN_PROGRESS', 'DONE']),
    body('dueDate').optional().isISO8601(),
  ],
  validateRequest,
  updateTask
);

router.delete(
  '/:id',
  authenticate,
  [param('id').isInt().withMessage('Invalid task ID')],
  validateRequest,
  deleteTask
);

export default router;
