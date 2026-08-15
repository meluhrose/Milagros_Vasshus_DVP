# REST API: Express & TypeScript

## Description 💻


This assignment is a REST API built with Express.js and TypeScript, using a MYSQL database for data storage. The API provides user authentication and allows authenticated users to submit their own articles. This is a practice building a backend API, working with databases, implementing authentication, and handling HTTP requests and errors.

No frontend is included in this project and the API can be tested using Postman.

## Technology Stack 🛠

- Node.js
- Express.js
- TypeScript
- VSCode
- MYSQL
- mysql2
- JWT
- bcrypt
- dotenv
- Postman

## Features ⭐

- User registration
- User login with JWT authentication
- Password hasing with bcrypt
- View all articles
- Create new atricles
- Protected routes using JWT authentication
- Basic validation and error handling
- Parameterised SQL queries


## Database 📁

This project uses two tables:

### Users 

- id
- email
- password_hash
- created_at

### Articles

- id
- title
- body
- category
- submitted_by
- created_at

 
## Getting Started ✍

### Prerequisites

Before running the project, make sure the following are installed:

- Node.js
- MySQL
- Postman

### Clone the repository

```bash
git clone https://github.com/meluhrose/Milagros_Vasshus_DVP.git
cd Milagros_Vasshus_DVP
```

### Install dependencies

Install the required npm packages.

  ```npm install```

### Enviornment variables

Create .env file in the root of the project.

Add the following:

```
  DB_HOST=localhost<br>
  DB_USER=your_username<br>
  DB_PASSWORD=your_password<br>
  DB_NAME=your_database<br>
  JWT_SECRET=your_secret<br>
```
Replace the values with your own MySQL crednetials and JWT secret.

### Run this project

```npm run dev```

API Should run on:

```
http://localhost:3000
```

API can be tested using [Postman](https://www.postman.com/)

## Testing🧪

- User registration
- User login
- Getting articles
- creating articles with authentication
- testing protected routes
- testing invalid requests and error responses
  

  
