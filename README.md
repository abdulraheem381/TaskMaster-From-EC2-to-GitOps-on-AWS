# TaskMaster - Complete 3-Tier Web Application

TaskMaster is a simple yet powerful task management application built with a modern 3-tier architecture. It serves as an excellent foundation for DevOps and Cloud Engineering learning projects.

## 🏗️ Architecture

```
┌─────────────────────┐
│  Frontend (React)   │
│  Port: 5173         │
└──────────┬──────────┘
           │
           │ HTTP/REST API
           │
┌──────────▼──────────┐
│ Backend (Express.js)│
│ Port: 5000          │
└──────────┬──────────┘
           │
           │ Prisma ORM
           │
┌──────────▼──────────┐
│  PostgreSQL DB      │
│ Port: 5432          │
└─────────────────────┘
```

## 🚀 Features

### MVP Features:
- ✅ User authentication (Register/Login with JWT)
- ✅ Project/Board CRUD operations
- ✅ Task management (Create, Read, Update, Delete)
- ✅ Task status tracking (To Do, In Progress, Done)
- ✅ Due dates for tasks
- ✅ Dashboard with project overview
- ✅ Input validation with express-validator
- ✅ Error handling middleware
- ✅ JWT authentication middleware
- ✅ CORS support
- ✅ Security headers (Helmet)

### Future Enhancements:
- Task assignment and collaboration
- Comments and activity logs
- Email notifications
- Real-time updates with WebSockets
- Advanced filtering and search
- API documentation (Swagger)
- Unit and integration tests

## � Application Screenshots

### Login Page
![Login Page](./docs/images/Screenshot%202026-01-28%20105646.png)

### Registration Page
![Registration Page](./docs/images/Screenshot%202026-01-28%20105705.png)

### Dashboard - Projects Overview
![Dashboard](./docs/images/Screenshot%202026-01-28%20105818.png)

### Project Detail - Task Management
![Task Management](./docs/images/Screenshot%202026-01-28%20105836.png)

## �📋 Tech Stack

### Backend
- **Runtime:** Node.js 20
- **Framework:** Express.js
- **Database:** PostgreSQL 16
- **ORM:** Prisma
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Validation:** express-validator
- **Security:** helmet, cors
- **Logging:** morgan

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Runtime:** Node.js 20

### DevOps
- **Containerization:** Docker
- **Orchestration:** Docker Compose
- **Database:** PostgreSQL 16 Alpine
- **Web Server:** Nginx Alpine (for frontend)

## 📁 Project Structure

```
TaskMaster/
├── backend/
│   ├── src/
│   │   ├── server.js              # Express app entry point
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── projectRoutes.js
│   │   │   └── taskRoutes.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── projectController.js
│   │   │   └── taskController.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   ├── validationMiddleware.js
│   │   │   └── errorHandler.js
│   │   └── utils/
│   │       ├── jwt.js
│   │       └── password.js
│   ├── prisma/
│   │   ├── schema.prisma          # Database schema
│   │   └── seed.js                # Seed data
│   ├── Dockerfile                 # Multi-stage build
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── main.jsx               # React entry point
│   │   ├── App.jsx                # Main app component
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── ProjectDetail.jsx
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── ProjectForm.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskCard.jsx
│   │   ├── api/
│   │   │   ├── client.js          # Axios instance
│   │   │   └── endpoints.js       # API endpoints
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Auth state management
│   │   └── styles/
│   │       └── index.css
│   ├── Dockerfile
│   ├── nginx.conf                 # Nginx configuration
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── .env.example
│
├── docker-compose.yml             # Full stack orchestration
├── .gitignore
└── README.md

```

## 🛠️ Installation & Setup

### Prerequisites
- Docker & Docker Compose (recommended)
- OR: Node.js 20+, PostgreSQL 16, npm/yarn

### Option 1: Docker Compose (Recommended)

1. **Clone the repository:**
   ```bash
   cd TaskMaster
   ```

2. **Start the full stack:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - Database: localhost:5432

4. **Login with demo credentials:**
   - Email: `demo@taskmaster.com`
   - Password: `password123`

### Option 2: Local Development

#### Backend Setup

1. **Navigate to backend:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Update `.env` with your local database:**
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/taskmaster
   NODE_ENV=development
   PORT=5000
   JWT_SECRET=your_super_secret_jwt_key_here
   FRONTEND_URL=http://localhost:5173
   ```

5. **Setup PostgreSQL database:**
   ```bash
   # Make sure PostgreSQL is running
   # Create database
   createdb taskmaster
   ```

6. **Run Prisma migrations:**
   ```bash
   npm run prisma:migrate
   ```

7. **Seed sample data:**
   ```bash
   npm run seed
   ```

8. **Start backend:**
   ```bash
   npm run dev
   ```

#### Frontend Setup

1. **Navigate to frontend (in new terminal):**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Start frontend dev server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   - Navigate to http://localhost:5173

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Projects
- `POST /api/projects` - Create project
- `GET /api/projects` - Get all projects for user
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/project/:projectId` - Get tasks by project
- `GET /api/tasks/:id` - Get task details
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🔐 Authentication

TaskMaster uses JWT (JSON Web Tokens) for authentication:

1. User registers/logs in → Backend generates JWT token
2. Token is stored in localStorage (frontend)
3. Token is sent in Authorization header for protected routes
4. Middleware validates token on each request
5. Invalid/expired tokens redirect to login

## 📊 Database Schema

### Users Table
- id (Primary Key)
- email (Unique)
- password (Hashed)
- name
- createdAt, updatedAt

### Projects Table
- id (Primary Key)
- title
- description
- userId (Foreign Key)
- createdAt, updatedAt

### Tasks Table
- id (Primary Key)
- title
- description
- status (TO_DO, IN_PROGRESS, DONE)
- dueDate
- projectId (Foreign Key)
- userId (Foreign Key)
- createdAt, updatedAt

## 🧪 Testing the Application

1. **Register a new user:**
   - Click "Register" on login page
   - Enter email, password, and name
   - Submit form

2. **Create a project:**
   - After login, click "New Project"
   - Enter project title and description
   - Click "Create Project"

3. **Create tasks:**
   - Click on a project to view details
   - Click "New Task"
   - Enter task details, due date
   - Click "Create Task"

4. **Manage tasks:**
   - Drag tasks between status columns OR use dropdown
   - Click delete (✕) to remove task
   - Update task details by changing status/date

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild images
docker-compose up --build

# Run database migrations in container
docker-compose exec backend npm run prisma:migrate

# Seed database
docker-compose exec backend npm run seed
```

## 📝 Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/taskmaster
NODE_ENV=development
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_here
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Deployment Considerations

### For EC2 Deployment:
1. Build Docker images for production
2. Push to ECR (Elastic Container Registry)
3. Use Docker Compose or ECS for orchestration
4. Configure RDS for PostgreSQL
5. Use Application Load Balancer for traffic distribution
6. Set up CloudFront for CDN
7. Configure security groups and IAM roles
8. Monitor with CloudWatch

### For Kubernetes:
1. Create Helm charts for both services
2. Deploy to EKS (Elastic Kubernetes Service)
3. Use RDS for database
4. Configure ingress controllers
5. Set up auto-scaling policies
6. Use ConfigMaps for environment variables
7. Implement GitOps with ArgoCD

## 🔍 Best Practices Implemented

✅ **Security:**
- Password hashing with bcrypt
- JWT token-based authentication
- Helmet for security headers
- CORS protection
- Input validation

✅ **Code Quality:**
- Modular structure (controllers, routes, middleware)
- Error handling middleware
- Input validation on all endpoints
- Environment variable management

✅ **DevOps:**
- Docker containerization
- Multi-stage builds
- Health checks
- Docker Compose for local dev
- Volume mounts for development

✅ **Frontend:**
- React Context for state management
- Protected routes
- Responsive design with Tailwind
- Error handling
- Loading states

## 🤝 Contributing

This is a learning project. Feel free to extend it with:
- Additional features (collaboration, notifications, etc.)
- Testing (Jest, Cypress)
- CI/CD pipeline (GitHub Actions, GitLab CI)
- Monitoring & logging (ELK stack, Prometheus)
- Advanced deployment strategies

## 📚 Learning Resources

### DevOps & Cloud:
- AWS EC2 deployment
- Docker and containerization
- Docker Swarm clustering
- Kubernetes basics
- CI/CD pipelines
- Infrastructure as Code (Terraform, CloudFormation)
- Load balancing and scaling
- Monitoring and logging

### Development:
- Node.js best practices
- React patterns and hooks
- Database design with Prisma
- RESTful API design
- JWT authentication

## 📖 Next Steps for Learning

1. **Add Tests:** Implement Jest tests for backend and Cypress for frontend
2. **Add Logging:** Integrate Winston or Pino for logging
3. **Add Monitoring:** Set up Prometheus and Grafana
4. **Add CI/CD:** Create GitHub Actions workflows
5. **Deploy to AWS:** Push to EC2, RDS, and ALB
6. **Scale with Kubernetes:** Create Helm charts and deploy to EKS
7. **Add GitOps:** Implement ArgoCD for continuous deployment
8. **Add Microservices:** Refactor into separate services (auth, tasks, projects)

## 📄 License

MIT - Feel free to use this project for learning and development.

---

**Happy Learning! 🚀**

For more details, check individual component files or run with Docker Compose for a quick start.
