// import express from "express"

// const app = express();
// const port = 2000

// const todosList = [
//     [
//   {
//     "id": 1,
//     "title": "Finish project report",
//     "description": "Complete the final draft of the quarterly project report.",
//     "dead_line": "2025-11-20",
//     "priority": "High",
//     "isCompleted": false,
//     "date_time": "2025-11-17T10:30:00",
//     "isExtended": false,
//     "status": "In Progress"
//   },
//   {
//     "id": 2,
//     "title": "Team meeting",
//     "description": "Weekly sync-up with the development team.",
//     "dead_line": "2025-11-18",
//     "priority": "Medium",
//     "isCompleted": true,
//     "date_time": "2025-11-16T15:00:00",
//     "isExtended": false,
//     "status": "Completed"
//   },
//   {
//     "id": 3,
//     "title": "Update website content",
//     "description": "Add new product details and images to the website.",
//     "dead_line": "2025-11-25",
//     "priority": "Low",
//     "isCompleted": false,
//     "date_time": "2025-11-17T09:00:00",
//     "isExtended": true,
//     "status": "Extended"
//   },
//   {
//     "id": 4,
//     "title": "Client follow-up call",
//     "description": "Discuss contract renewal and clarify feature requests.",
//     "dead_line": "2025-11-19",
//     "priority": "High",
//     "isCompleted": false,
//     "date_time": "2025-11-17T14:00:00",
//     "isExtended": false,
//     "status": "Pending"
//   }
// ]

// ] 



const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

// Serve public folder
app.use(express.static("public"));

let tasks = [
  {
    id: 1,
    title: "Finish project report",
    description: "Complete the final draft of the quarterly project report.",
    dead_line: "2025-11-20",
    priority: "High",
    isCompleted: false,
    date_time: "2025-11-17T10:30:00",
    isExtended: false,
    status: "In Progress"
  },
  {
    id: 2,
    title: "Team meeting",
    description: "Weekly sync-up with the development team.",
    dead_line: "2025-11-18",
    priority: "Medium",
    isCompleted: true,
    date_time: "2025-11-16T15:00:00",
    isExtended: false,
    status: "Completed"
  },
  {
    id: 3,
    title: "Update website content",
    description: "Add new product details and images to the website.",
    dead_line: "2025-11-25",
    priority: "Low",
    isCompleted: false,
    date_time: "2025-11-17T09:00:00",
    isExtended: true,
    status: "Extended"
  }
];

// CRUD Endpoints
app.get("/tasks", (req, res) => res.json(tasks));

app.post("/tasks", (req, res) => {
  const newTask = { id: tasks.length + 1, ...req.body };
  tasks.push(newTask);
  res.json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const index = tasks.findIndex(t => t.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "Task not found" });

  tasks[index] = { ...tasks[index], ...req.body };
  res.json(tasks[index]);
});

app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex(t => t.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "Task not found" });

  const deleted = tasks.splice(index, 1);
  res.json(deleted[0]);
});

// Start Server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
