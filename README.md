# 🚀 REST API Server (Node.js + Express + MongoDB + Redis)

A scalable REST API built with **Node.js**, **Express**, and **MongoDB**.  
The project includes **JWT authentication**, **Redis caching**, **Cloudinary file uploads**, **Swagger API documentation**, and **Docker support**.

This API is designed using modern backend practices such as:

- Authentication with **JWT**
- **Redis caching** for performance
- **MongoDB + Mongoose** for database management
- **Cloudinary** for image storage
- **Swagger UI** for API documentation
- **Docker** for containerized deployment
- **Rate limiting & validation** for security

---

# 📸 API Documentation Preview

![Swagger Screenshot](https://res.cloudinary.com/db5nsembw/image/upload/v1772732871/Screenshot_2026-03-06_004735_p29ovu.png)

Swagger UI provides an interactive way to test API endpoints.

---

# 🧰 Tech Stack

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- JWT (Access + Refresh Tokens)
- Passport JWT Strategy
- bcrypt password hashing

### Caching

- Redis

### File Upload

- Multer
- Cloudinary

### API Documentation

- Swagger (swagger-jsdoc + swagger-ui-express)

### Security & Utilities

- express-rate-limit
- express-validator
- cors
- dotenv
- morgan

### DevOps

- Docker

---

# ⚙️ Installation

## 1️⃣ Clone the repository

```bash
git clone https://github.com/RaChhun123/REST-API.git
cd REST-API
```

## 2️⃣ Install dependencies

```bash
npm install
```

## 3️⃣ Setup environment variables

Create a `.env` file in the root directory.

Example:

```bash
PORT=5000

MONGODB_URL=mongodb://localhost:27017/mydatabase

CACHE_SERVER=redis://localhost:6379

NODE_ENV=development

JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret

ACCESS_TOKEN_EXPIRE=15m
REFRESH_TOKEN_EXPIRE=7d

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## ▶️ Running the Project

Start the development server:

```bash
npm start
```

---
