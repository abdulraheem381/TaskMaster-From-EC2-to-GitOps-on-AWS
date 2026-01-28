import express from 'express';
import { body, param } from 'express-validator';
import { authenticate } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validationMiddleware.js';
import {
  createProject,
  getUserProjects,
  getProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';

const router = express.Router();

router.post(
  '/',
  authenticate,
  [
    body('title').notEmpty().withMessage('Title is required'),
  ],
  validateRequest,
  createProject
);

router.get('/', authenticate, getUserProjects);

router.get(
  '/:id',
  authenticate,
  [param('id').isInt().withMessage('Invalid project ID')],
  validateRequest,
  getProject
);

router.put(
  '/:id',
  authenticate,
  [
    param('id').isInt().withMessage('Invalid project ID'),
    body('title').optional().notEmpty(),
    body('description').optional(),
  ],
  validateRequest,
  updateProject
);

router.delete(
  '/:id',
  authenticate,
  [param('id').isInt().withMessage('Invalid project ID')],
  validateRequest,
  deleteProject
);

export default router;
