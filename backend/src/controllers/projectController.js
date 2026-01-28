import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createProject = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const userId = parseInt(req.userId, 10);

    console.log('Creating project with userId:', userId, 'type:', typeof userId);

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      console.log('User not found:', userId);
      return res.status(401).json({ 
        error: 'User not found. Please log in again.',
        code: 'USER_NOT_FOUND'
      });
    }

    const project = await prisma.project.create({
      data: {
        title,
        description: description || null,
        userId,
      },
    });

    res.status(201).json({
      message: 'Project created successfully',
      project,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserProjects = async (req, res, next) => {
  try {
    const userId = parseInt(req.userId, 10);

    const projects = await prisma.project.findMany({
      where: { userId },
      include: {
        tasks: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({
      projects,
      count: projects.length,
    });
  } catch (error) {
    next(error);
  }
};

export const getProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = parseInt(req.userId, 10);

    const project = await prisma.project.findFirst({
      where: {
        id: parseInt(id),
        userId,
      },
      include: {
        tasks: true,
      },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json(project);
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const userId = parseInt(req.userId, 10);

    // Check ownership
    const project = await prisma.project.findFirst({
      where: {
        id: parseInt(id),
        userId,
      },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const updatedProject = await prisma.project.update({
      where: { id: parseInt(id) },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
      },
    });

    res.status(200).json({
      message: 'Project updated successfully',
      project: updatedProject,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = parseInt(req.userId, 10);

    // Check ownership
    const project = await prisma.project.findFirst({
      where: {
        id: parseInt(id),
        userId,
      },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    await prisma.project.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      message: 'Project deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
