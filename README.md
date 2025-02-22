### Backend README (`cave-digital-assignment-backend`)

# Cave Digital Assignment - Backend (NestJS, MongoDB)

This is the backend for the Cave Digital Assignment app, built with NestJS and MongoDB. It provides JWT-based authentication and CRUD operations for tasks, secured with protected routes, along with a password reset feature using email OTPs.

## Features

### Authentication (JWT-based)
- **`POST /auth/signup`**: Register a new user with name, email, and password.
- **`POST /auth/login`**: Authenticate a user and return a JWT.
- **`POST /auth/reset-password-request`**: Sends an OTP to email.
- **`POST /auth/reset-password`**: Resets the password with a valid OTP.

### Task Management (Protected Routes - Requires JWT)
- **`POST /tasks`**: Create a new task.
- **`GET /tasks`**: Fetch all tasks for the logged-in user.
- **`GET /tasks/:id`**: Get details of a specific task.
- **`PUT /tasks/:id`**: Update a task.
- **`DELETE /tasks/:id`**: Delete a task.

## Tech Stack
- **Framework**: NestJS
- **Database**: MongoDB with Mongoose
- **Authentication**: `jsonwebtoken` (JWT)
- **Password Hashing**: `bcryptjs`
- **Email**: `@nestjs-modules/mailer` with SendGrid
- **Middleware**: CORS, Express JSON

## Setup Instructions
  **Prerequisites**
  - Node.js (v16 or higher)
  - npm or yarn
  - MongoDB (local or cloud, e.g., MongoDB Atlas)
  - SendGrid account (for password reset)

### Installation
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Aishwaryashetty/cave-digital-assignment-backend.git
   cd CAVE-DIGITAL-ASSIGN

### Install Dependencies:
1. **Using npm**
   ```bash
   npm install

### Configure Environment Variables:
1. **Create a .env file in the root with:**
   ```bash
    MONGO_URI=mongodb://localhost:27017/cave-digital
    JWT_SECRET=your_jwt_secret
    SMTP_HOST=smtp.sendgrid.net
    SMTP_PORT=587
    SMTP_USER=apikey
    SMTP_PASS=SG.your-sendgrid-api-key
    SMTP_FROM=no-reply@yourdomain.com

## Project Structure
  ```
    CAVE-DIGITAL-ASSIGN/
    ├── dist/
    ├── node_modules/
    ├── src/
    │   ├── auth/
    │   │   ├── dto/
    │   │   ├── entities/
    │   │   ├── jwt/
    │   │   ├── auth.controller.spec.ts
    │   │   ├── auth.controller.ts
    │   │   ├── auth.module.ts
    │   │   ├── auth.service.spec.ts
    │   │   └── auth.service.ts
    │   ├── tasks/
    │   │   ├── dto/
    │   │   ├── entities/
    │   │   ├── tasks.controller.spec.ts
    │   │   ├── tasks.controller.ts
    │   │   ├── tasks.module.ts
    │   │   ├── tasks.service.spec.ts
    │   │   └── tasks.service.ts
    │   ├── users/
    │   │   ├── dto/
    │   │   ├── entities/
    │   │   ├── users.controller.spec.ts
    │   │   ├── users.controller.ts
    │   │   ├── users.module.ts
    │   │   ├── users.service.spec.ts
    │   │   └── users.service.ts
    │   ├── app.controller.spec.ts
    │   ├── app.controller.ts
    │   ├── app.module.ts
    │   ├── app.service.ts
    │   └── main.ts
    │   ├── test/
    ├── .env
    ├── .gitignore
    ├── .prettierrc
    ├── eslintrc.config.mjs
    ├── nest-cli.json
    ├── package-lock.json
    ├── package.json
    ├── README.md
    ├── tsconfig.build.json
    ├── tsconfig.json
    └── yarn.lock
```

### Happy Testing! 🚀
Dive in, explore the app, and enjoy managing your tasks with Cave Digital Assignment!
