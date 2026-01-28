# TaskMaster - API Documentation

## Base URL
- **Development:** `http://localhost:5000/api`
- **Production:** `https://your-domain.com/api`

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔐 Authentication Endpoints

### Register User
Creates a new user account.

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}
```

**Validation Rules:**
- `email` - Must be valid email format
- `password` - Minimum 6 characters
- `name` - Required, non-empty string

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Error Response (409):**
```json
{
  "error": "Email already registered"
}
```

**Error Response (400):**
```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email"
    },
    {
      "msg": "Password must be at least 6 characters",
      "param": "password"
    }
  ]
}
```

---

### Login User
Authenticates user and returns JWT token.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

**Error Response (401):**
```json
{
  "error": "Invalid email or password"
}
```

---

## 📁 Project Endpoints

### Create Project
Creates a new project for the authenticated user.

**Endpoint:** `POST /projects`

**Required Auth:** Yes (Bearer token required)

**Request Body:**
```json
{
  "title": "My First Project",
  "description": "A project for learning TaskMaster"
}
```

**Validation Rules:**
- `title` - Required, non-empty string
- `description` - Optional

**Success Response (201):**
```json
{
  "message": "Project created successfully",
  "project": {
    "id": 1,
    "title": "My First Project",
    "description": "A project for learning TaskMaster",
    "userId": 1,
    "createdAt": "2024-01-28T10:30:00.000Z",
    "updatedAt": "2024-01-28T10:30:00.000Z"
  }
}
```

**Error Response (401):**
```json
{
  "error": "No token provided"
}
```

---

### Get All Projects
Retrieves all projects for the authenticated user.

**Endpoint:** `GET /projects`

**Required Auth:** Yes

**Query Parameters:** None

**Success Response (200):**
```json
{
  "projects": [
    {
      "id": 1,
      "title": "My First Project",
      "description": "A project for learning TaskMaster",
      "userId": 1,
      "createdAt": "2024-01-28T10:30:00.000Z",
      "updatedAt": "2024-01-28T10:30:00.000Z",
      "tasks": [
        {
          "id": 1,
          "title": "Learn React",
          "status": "IN_PROGRESS",
          "projectId": 1
        }
      ]
    }
  ],
  "count": 1
}
```

---

### Get Project Details
Retrieves a specific project with its tasks.

**Endpoint:** `GET /projects/:id`

**Required Auth:** Yes

**Path Parameters:**
- `id` (integer) - Project ID

**Success Response (200):**
```json
{
  "id": 1,
  "title": "My First Project",
  "description": "A project for learning TaskMaster",
  "userId": 1,
  "createdAt": "2024-01-28T10:30:00.000Z",
  "updatedAt": "2024-01-28T10:30:00.000Z",
  "tasks": [...]
}
```

**Error Response (404):**
```json
{
  "error": "Project not found"
}
```

---

### Update Project
Updates a project's title or description.

**Endpoint:** `PUT /projects/:id`

**Required Auth:** Yes

**Path Parameters:**
- `id` (integer) - Project ID

**Request Body:**
```json
{
  "title": "Updated Project Title",
  "description": "Updated description"
}
```

**Validation Rules:**
- `title` - Optional, non-empty if provided
- `description` - Optional

**Success Response (200):**
```json
{
  "message": "Project updated successfully",
  "project": {
    "id": 1,
    "title": "Updated Project Title",
    "description": "Updated description",
    "userId": 1,
    "createdAt": "2024-01-28T10:30:00.000Z",
    "updatedAt": "2024-01-28T10:35:00.000Z"
  }
}
```

---

### Delete Project
Deletes a project and all its associated tasks.

**Endpoint:** `DELETE /projects/:id`

**Required Auth:** Yes

**Path Parameters:**
- `id` (integer) - Project ID

**Success Response (200):**
```json
{
  "message": "Project deleted successfully"
}
```

**Error Response (404):**
```json
{
  "error": "Project not found"
}
```

---

## ✅ Task Endpoints

### Create Task
Creates a new task within a project.

**Endpoint:** `POST /tasks`

**Required Auth:** Yes

**Request Body:**
```json
{
  "title": "Learn TypeScript",
  "description": "Complete TypeScript fundamentals course",
  "projectId": 1,
  "status": "TO_DO",
  "dueDate": "2024-02-15"
}
```

**Validation Rules:**
- `title` - Required, non-empty string
- `description` - Optional
- `projectId` - Required, must be integer
- `status` - Optional, one of: `TO_DO`, `IN_PROGRESS`, `DONE` (default: `TO_DO`)
- `dueDate` - Optional, must be ISO 8601 format (YYYY-MM-DD)

**Success Response (201):**
```json
{
  "message": "Task created successfully",
  "task": {
    "id": 1,
    "title": "Learn TypeScript",
    "description": "Complete TypeScript fundamentals course",
    "status": "TO_DO",
    "dueDate": "2024-02-15T00:00:00.000Z",
    "projectId": 1,
    "userId": 1,
    "createdAt": "2024-01-28T10:30:00.000Z",
    "updatedAt": "2024-01-28T10:30:00.000Z"
  }
}
```

**Error Response (404):**
```json
{
  "error": "Project not found"
}
```

---

### Get Tasks by Project
Retrieves all tasks for a specific project.

**Endpoint:** `GET /tasks/project/:projectId`

**Required Auth:** Yes

**Path Parameters:**
- `projectId` (integer) - Project ID

**Success Response (200):**
```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Learn TypeScript",
      "description": "Complete TypeScript fundamentals course",
      "status": "IN_PROGRESS",
      "dueDate": "2024-02-15T00:00:00.000Z",
      "projectId": 1,
      "userId": 1,
      "createdAt": "2024-01-28T10:30:00.000Z",
      "updatedAt": "2024-01-28T10:35:00.000Z"
    }
  ],
  "count": 1
}
```

---

### Get Task Details
Retrieves a specific task.

**Endpoint:** `GET /tasks/:id`

**Required Auth:** Yes

**Path Parameters:**
- `id` (integer) - Task ID

**Success Response (200):**
```json
{
  "id": 1,
  "title": "Learn TypeScript",
  "description": "Complete TypeScript fundamentals course",
  "status": "IN_PROGRESS",
  "dueDate": "2024-02-15T00:00:00.000Z",
  "projectId": 1,
  "userId": 1,
  "createdAt": "2024-01-28T10:30:00.000Z",
  "updatedAt": "2024-01-28T10:35:00.000Z"
}
```

**Error Response (404):**
```json
{
  "error": "Task not found"
}
```

---

### Update Task
Updates a task's details.

**Endpoint:** `PUT /tasks/:id`

**Required Auth:** Yes

**Path Parameters:**
- `id` (integer) - Task ID

**Request Body:**
```json
{
  "title": "Learn TypeScript Advanced",
  "description": "Advanced TypeScript patterns and types",
  "status": "IN_PROGRESS",
  "dueDate": "2024-02-20"
}
```

**Validation Rules:**
- `title` - Optional, non-empty if provided
- `description` - Optional
- `status` - Optional, one of: `TO_DO`, `IN_PROGRESS`, `DONE`
- `dueDate` - Optional, must be ISO 8601 format or null

**Success Response (200):**
```json
{
  "message": "Task updated successfully",
  "task": {
    "id": 1,
    "title": "Learn TypeScript Advanced",
    "description": "Advanced TypeScript patterns and types",
    "status": "IN_PROGRESS",
    "dueDate": "2024-02-20T00:00:00.000Z",
    "projectId": 1,
    "userId": 1,
    "createdAt": "2024-01-28T10:30:00.000Z",
    "updatedAt": "2024-01-28T10:40:00.000Z"
  }
}
```

---

### Delete Task
Deletes a task.

**Endpoint:** `DELETE /tasks/:id`

**Required Auth:** Yes

**Path Parameters:**
- `id` (integer) - Task ID

**Success Response (200):**
```json
{
  "message": "Task deleted successfully"
}
```

**Error Response (404):**
```json
{
  "error": "Task not found"
}
```

---

## 📊 Status Codes Reference

| Code | Meaning | Use Case |
|------|---------|----------|
| 200 | OK | Successful GET, PUT request |
| 201 | Created | Successful POST request |
| 400 | Bad Request | Validation error |
| 401 | Unauthorized | Missing/invalid token |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Email already registered |
| 500 | Server Error | Internal server error |

---

## 🔑 JWT Token

**Token Format:** `Bearer <jwt_token>`

**Token Payload (decoded):**
```json
{
  "userId": 1,
  "iat": 1706418400,
  "exp": 1707023200
}
```

**Token Duration:** 7 days

**Refresh:** Re-login to get a new token

---

## 📝 Example Usage with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Create Project (with token)
```bash
TOKEN="your_jwt_token_here"
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "My Project",
    "description": "Project description"
  }'
```

### Get All Projects
```bash
TOKEN="your_jwt_token_here"
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer $TOKEN"
```

---

## 🧪 Example Usage with JavaScript

```javascript
const API_URL = 'http://localhost:5000/api';

// Register
async function register(email, password, name) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name })
  });
  return response.json();
}

// Login
async function login(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return response.json();
}

// Create Project
async function createProject(token, title, description) {
  const response = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ title, description })
  });
  return response.json();
}

// Usage
const result = await login('demo@taskmaster.com', 'password123');
const token = result.token;
const project = await createProject(token, 'My Project', 'Description');
```

---

## ⚠️ Common Errors

### 401 Unauthorized
- Missing Authorization header
- Invalid or expired token
- **Solution:** Re-login to get new token

### 400 Bad Request
- Invalid input format
- Missing required fields
- **Solution:** Check request body against validation rules

### 404 Not Found
- Project/Task doesn't exist
- User doesn't own the resource
- **Solution:** Verify ID and user permissions

### 409 Conflict
- Email already registered
- **Solution:** Use different email or login instead

---

For more information, see [README.md](README.md)
