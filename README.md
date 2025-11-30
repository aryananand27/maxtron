# TaskFlow – Real-Time Task Management System

Welcome to **TaskFlow**!  
A beautiful full-stack real-time task management application with instant updates using **Socket.IO**.  
Built with **React + TypeScript + Vite**, **Node.js + Express**, **Sequelize ORM**, **PostgreSQL**, and **Tailwind CSS**.

Live Demo: https://maxtron-q3wg.onrender.com
---

## Table of Contents
- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Running the Backend](#running-the-backend)
- [Database Migration](#database-migration)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Prerequisites

Ensure the following are installed on your machine:

- **Node.js** (v20.18 or later recommended)
- **npm** (included with Node.js)
- **PostgreSQL** (v17 or later)
- **Git**

> **Tip**: Use [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions easily.

---

---

### Database Schema (`Tasks` Table)

```sql
CREATE TABLE "Tasks" (
  id            SERIAL PRIMARY KEY,
  title         VARCHAR(255) NOT NULL,
  description   TEXT,
  status        BOOLEAN NOT NULL DEFAULT false,
  "createdAt"   TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updatedAt"   TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
```
---

## Environment Variables

Create a `.env` file in the root directory of the backend and add the following environment variables:

### Include this when you are setting up the docker

- **PORT**: The port on which the backend will run (default: 4000).
- **NODE_ENV**: Set to `development` for local development.
- **DB_USER**: PostgreSQL username (default: `postgres`).
- **DB_PASSWORD**: PostgreSQL password (default: `aryan`).
- **DB_NAME**: Name of the PostgreSQL database (default: `maxtron`).
- **DB_HOST**: Database host (default: `localhost`).
- **DB_PORT**: PostgreSQL port (default: `5432`).

> **Note**: Ensure your PostgreSQL server is running and the database user has the necessary permissions to create the `maxtron` database.

## Installation

1. **Clone the Repository**:
   Navigate to your desired directory and clone the repository:
   ```bash
   git clone https://github.com/aryananand27/maxtron.git

---


## Running the Backend:

**1. Navigate to Backend**
       Navigate to the backend folder using:

        cd backend
    
**2. Install Dependencies**

        npm install
 Use the exact package versions from package.json to avoid compatibility issues.

**3. Run Database Migrations**:
        I have created the migration files just follow in the same directory i.e. /backend and run
          
        npx sequelize-cli db:migrate
      
   ###### This creates the necessary tables in the tasksmanagement database. This will only work when you have desired .env file and database configuration as suggested above

**4. Start the Backend Server**
   
         npm run dev

   ###### Server will run at: http://localhost:4000

---


## Running the Frontend

**1. Navigate to Frontend**
        Navigate to the frontend folder using:

        cd ..
        cd frontend
  
**2. Install Dependencies**

        npm install
   
**3. Create .env File**
       In the frontend root, create a .env file:

       VITE_API_URL=http://localhost:4000/api

**4. Start the Frontend**
   
         npm run dev

   ###### Frontend will run at: http://localhost:5173

---


## API Endpoints

   Test APIs using the provided Postman Collection:
    

   ###### Base URL Used: http://localhost:4000/api,
   ###### Create Task: http://localhost:4000/api/tasks,
   ###### GetAllTasks: http://localhost:4000/api/tasks,
   ###### Update Task: http://localhost:4000/api/tasks/id,
   
---

## NOTE: 
   * Use Node.js v20.18+ to avoid compatibility issues.
   * Ensure PostgreSQL is running before starting migrations.
   * For production, use secure secrets and environment-specific configs.

## Thank You! 🙌
   Built by Aryan Anand 



