📝 Todo App — Full-Stack (React + Express + Redux Toolkit)

A fully functional Todo Management Application built using ⚛️ React, 🟩 Express.js, and 🟣 Redux Toolkit.
This project demonstrates modern full-stack development with clean folder structure, API integration, and complete CRUD functionality.

✨ Features
🎨 Frontend (React + Redux Toolkit)

➕ Add Todo

📝 Edit Todo

❌ Delete Todo

✔️ Mark as Completed

🔄 Live UI updates with Redux Toolkit

📦 Modular and clean React components

🚀 Backend (Express.js API)

📡 REST API endpoints

🌐 CORS enabled

🗂 JSON-based todo storage

🧩 Easy to expand with DB in future

📁 Project Structure
TODO_APP/
│
├── server.js                    # 🚀 Express backend server
│
├── src/
│   ├── features/
│   │   └── todoSlice.js         # 🧠 Redux Toolkit slice for todos
│   │
│   ├── components/
│   │   └── Todo.jsx             # 🖥️ Todo UI component
│   │
│   ├── App.jsx                  # Main app wrapper
│   ├── main.jsx                 # React entry file
│   └── index.css                # Global stylesheet
│
├── package.json
└── README.md

🛠️ Tech Stack
Frontend

⚛️ React

🟣 Redux Toolkit

🎨 CSS / Tailwind

⚡ Vite (optional)

Backend

🟩 Node.js

🚀 Express.js

🔒 CORS

📡 REST API

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/TODO_APP.git
cd TODO_APP

2️⃣ Install Frontend Dependencies
npm install
npm run dev

3️⃣ Install Backend Dependencies
npm install express cors
node server.js

🌐 API Documentation

Below is the complete API used by the frontend:

📌 GET — Fetch all todos
GET /todos


Response Example:

[
  {
    "id": 1,
    "title": "Learn React",
    "completed": false
  }
]

📌 POST — Add a new todo
POST /todos


Body Example:

{
  "title": "New Task"
}

📌 PUT — Update a todo
PUT /todos/:id


Body Example:

{
  "title": "Updated Todo",
  "completed": true
}

📌 DELETE — Delete a todo
DELETE /todos/:id

🧩 Frontend Logic Explanation
🧠 src/features/todoSlice.js

Contains reducers & actions: addTodo, deleteTodo, toggleTodo, etc.

Uses Redux Toolkit’s createSlice

🖥️ src/components/Todo.jsx

Renders todos from store

Dispatches actions

Communicates with Express backend via fetch/axios

🖼️ Screenshots (Add Yours Here)

🔮 Future Enhancements

🔐 Add user authentication

🗄️ Connect backend to MongoDB

🎚️ Add filters (Completed / Pending)

📱 Make UI fully responsive
