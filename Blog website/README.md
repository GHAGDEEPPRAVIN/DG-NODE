# 📝 Blog Website (MERN Stack)

A full-stack **Blog Website** built using the **MERN Stack** that allows users to create, read, update, and delete blog posts with secure authentication, image uploads, and cookie-based sessions.

---

## 🚀 Features

### 🔐 Authentication
- User **Sign Up & Sign In**
- Password encryption using **bcrypt**
- Secure **cookie-based authentication**
- Protected routes for authenticated users

### 📰 Blog Management (CRUD)
- ✍️ Create new blog posts
- 📖 Read all blogs & single blog details
- ✏️ Update existing blog posts
- 🗑️ Delete blog posts (authorized users only)

### 🖼️ Image Upload
- Upload blog cover images
- Image storage handled via server (e.g., Multer / Cloud storage)
- Preview images before publishing

### 🍪 Cookies & Security
- Cookies set during **Sign In**
- HTTP-only cookies for better security
- Session persistence across refresh

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- Multer (for image upload)
- Cookie-Parser

---

## 📂 Project Structure

```bash
<pre>

blog-website/
│
├── backend/                   # Backend (Node + Express)
│   │
│   ├── controllers/
│   │   └── blogControllers.js     # Blog CRUD logic (Create, Read, Update, Delete)
│   │
│   ├── model/
│   │   └── blogModel.js           # Mongoose schema for Blog
│   │
│   ├── routes/
│   │   └── blogRoutes.js          # Blog API routes
│   │
│   ├── middlewares/
│   │   └── blogMiddleware.js      # Auth check, token verification
│   │
│   ├── uploads/                   # Uploaded blog images
│   │
│   └── server.js                  # Backend entry point
│
└── README.md


</pre>