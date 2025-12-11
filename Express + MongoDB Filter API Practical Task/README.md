# 📦 Express + MongoDB Product Filter API

A complete backend API built using **Express.js**, **MongoDB**, and **Mongoose**, focusing on **real-world filtering, searching, sorting & pagination**.  
This project is created as a **practical task** for students to learn API development and Postman testing.

---

## 🎯 Project Overview

This API allows performing advanced operations on a **Product Collection**, including:

- Fetching all products  
- Searching by name / brand  
- Filtering by category, price range & rating  
- Sorting products  
- Pagination support  
- Bonus: Multi-filtering in a single API  

It includes **error handling**, **clean folder structure**, and complete **Postman testing**.

---

## 🧩 Tech Stack

- ⚡ Node.js  
- 🚀 Express.js  
- 🍃 MongoDB  
- 🧵 Mongoose  
- 🧪 Postman  

---

## 📁 Folder Structure

<pre>
backend/
│── config/
│   └── db.js                # MongoDB Connection

│── models/
│   └── Product.model.js     # Product Schema

│── controllers/
│   └── productController.js # Business Logic

│── routes/
│   └── productRoutes.js     # All API Routes

└── server.js                # App Entry File

</pre>

## 📦 Product API Features (GET Routes)

### 1️⃣ Fetch all products  
```http
GET /products

### 2️⃣ Fetch product by ID
```http
GET /products/:id

### 3️⃣ Search by productName (case insensitive)
```http
GET /products/search?name=mobile

### 4️⃣ Search by brand
```http
GET /products/brand?brand=apple

### 5️⃣ Search by multiple fields (name + category + brand)
```http
GET /products/multi-search?name=phone&category=electronics&brand=samsung

### 6️⃣ Filter by category
```http
GET /products/category?category=laptop

### 7️⃣ Price range filter
```http
GET /products/price?min=1000&max=5000

### 8️⃣ Filter by rating
```http
GET /products/rating?minRating=4

### 9️⃣ Sorting by price (asc/desc)
```http
GET /products/sort?order=asc
GET /products/sort?order=desc

### 🔟 Pagination
```http
GET /products/pagination?page=1&limit=10

### 📘 Pagination Explanation

- Pagination divides large datasets into smaller parts.

- Example (100 products, limit = 10):
- Page 1 → items 1–10
- Page 2 → items 11–20
- Page 3 → items 21–30



## 📹 Demo – Postman API Testing (Video)

👉 Add your demo video link here:
https://drive.google.com/file/d/19TtZDmKNYOG7_wJ1kb2Ml_U7bcYyPTYp/view?usp=sharing