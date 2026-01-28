import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/password.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create a test user
  const hashedPassword = await hashPassword('password123');
  const user = await prisma.user.upsert({
    where: { email: 'demo@taskmaster.com' },
    update: {},
    create: {
      email: 'demo@taskmaster.com',
      password: hashedPassword,
      name: 'Demo User',
    },
  });

  console.log('✓ Created test user:', user.email);

  // Create sample projects
  const project1 = await prisma.project.create({
    data: {
      title: 'My First Project',
      description: 'Getting started with TaskMaster',
      userId: user.id,
    },
  });

  const project2 = await prisma.project.create({
    data: {
      title: 'Work Project',
      description: 'Project for work tasks',
      userId: user.id,
    },
  });

  console.log('✓ Created sample projects');

  // Create sample tasks
  await prisma.task.create({
    data: {
      title: 'Setup TaskMaster',
      description: 'Install and configure the application',
      status: 'DONE',
      projectId: project1.id,
      userId: user.id,
    },
  });

  await prisma.task.create({
    data: {
      title: 'Learn React',
      description: 'Complete React fundamentals course',
      status: 'IN_PROGRESS',
      dueDate: new Date('2026-02-15'),
      projectId: project1.id,
      userId: user.id,
    },
  });

  await prisma.task.create({
    data: {
      title: 'Deploy to AWS',
      description: 'Deploy TaskMaster to AWS EC2',
      status: 'TO_DO',
      dueDate: new Date('2026-03-01'),
      projectId: project2.id,
      userId: user.id,
    },
  });

  console.log('✓ Created sample tasks');
  console.log('✓ Database seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
