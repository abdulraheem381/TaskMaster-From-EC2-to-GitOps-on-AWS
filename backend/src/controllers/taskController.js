import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createTask = async (req, res, next) => {
  try {
    const { title, description, projectId, status, dueDate } = req.body;
    const userId = parseInt(req.userId, 10);

    // Verify project ownership
    const project = await prisma.project.findFirst({
      where: {
        id: parseInt(projectId),
        userId,
      },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description: description || null,
        status: status || 'TO_DO',
        dueDate: dueDate ? new Date(dueDate) : null,
        projectId: parseInt(projectId),
        userId,
      },
    });

    res.status(201).json({
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectTasks = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const userId = parseInt(req.userId, 10);

    // Verify project ownership
    const project = await prisma.project.findFirst({
      where: {
        id: parseInt(projectId),
        userId,
      },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const tasks = await prisma.task.findMany({
      where: {
        projectId: parseInt(projectId),
        userId,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({
      tasks,
      count: tasks.length,
    });
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = parseInt(req.userId, 10);

    const task = await prisma.task.findFirst({
      where: {
        id: parseInt(id),
        userId,
      },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;
    const userId = parseInt(req.userId, 10);

    // Check ownership
    const task = await prisma.task.findFirst({
      where: {
        id: parseInt(id),
        userId,
      },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(status && { status }),
        ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate) : null }),
      },
    });

    res.status(200).json({
      message: 'Task updated successfully',
      task: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = parseInt(req.userId, 10);

    // Check ownership
    const task = await prisma.task.findFirst({
      where: {
        id: parseInt(id),
        userId,
      },
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await prisma.task.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      message: 'Task deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
