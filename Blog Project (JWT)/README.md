# 📖 JWT Blog App with OTP Authentication

A modern **React + Node.js + Express + MongoDB** blog application with **JWT authentication** and **OTP login**.  
Users can **Sign Up**, **Sign In via OTP**, **create, edit, and delete blogs**, and **upload images** securely.  

---

## 🎬 Demo

> Watch Video (https://drive.google.com/file/d/1Gi5lBs7DSpqI61CZ5pOjcANAk9ZS3_ER/view?usp=sharing)

---

## ✨ Features

- 🔐 **Secure Authentication** using JWT stored in `httpOnly` cookies  
- ✉️ **OTP-based login** via email for added security  
- 📝 **Full CRUD operations** for blogs  
- 🖼️ **Image upload** support for blog posts  
- 🌈 **Responsive UI** with React and CSS  
- ⚡ **Fast and lightweight** full-stack setup  

---

## 🛠️ Tech Stack

- **Frontend:** React, Axios, CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT, OTP via Nodemailer  
- **File Upload:** Multer  
- **Environment:** dotenv  

---

## 🗂️ Folder Structure

root
│
├─ backend
│  ├─ config
│  │  ├─ db.js
│  │  └─ multer.js
│  ├─ controllers
│  │  └─ blogControllers.js
│  ├─ middleware
│  │  └─ blogMiddleware.js
│  ├─ model
│  │  └─ blogModel.js
│  ├─ routes
│  │  └─ blogRoutes.js
│  └─ server.js
│
├─ frontend
│  ├─ src
│  │  ├─ components
│  │  │  ├─ SignIn
│  │  │  │  ├─ SignIn.jsx
│  │  │  │  └─ SignIn.css
│  │  │  ├─ SignUp
│  │  │  │  ├─ SignUp.jsx
│  │  │  │  └─ SignUp.css
│  │  │  ├─ VerifyOtp
│  │  │  │  ├─ VerifyOtp.jsx
│  │  │  │  └─ VerifyOtp.css
│  │  │  └─ Home
│  │  │     ├─ Home.jsx
│  │  │     └─ Home.css
│  │  ├─ App.jsx
│  │  └─ index.css
│  └─ package.json
│
└─ README.md
