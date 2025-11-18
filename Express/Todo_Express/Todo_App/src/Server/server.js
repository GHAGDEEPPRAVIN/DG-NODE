import express from "express"

const app = express();
const port = 2000

const todosList = [
    [
  {
    "id": 1,
    "title": "Finish project report",
    "description": "Complete the final draft of the quarterly project report.",
    "dead_line": "2025-11-20",
    "priority": "High",
    "isCompleted": false,
    "date_time": "2025-11-17T10:30:00",
    "isExtended": false,
    "status": "In Progress"
  },
  {
    "id": 2,
    "title": "Team meeting",
    "description": "Weekly sync-up with the development team.",
    "dead_line": "2025-11-18",
    "priority": "Medium",
    "isCompleted": true,
    "date_time": "2025-11-16T15:00:00",
    "isExtended": false,
    "status": "Completed"
  },
  {
    "id": 3,
    "title": "Update website content",
    "description": "Add new product details and images to the website.",
    "dead_line": "2025-11-25",
    "priority": "Low",
    "isCompleted": false,
    "date_time": "2025-11-17T09:00:00",
    "isExtended": true,
    "status": "Extended"
  },
  {
    "id": 4,
    "title": "Client follow-up call",
    "description": "Discuss contract renewal and clarify feature requests.",
    "dead_line": "2025-11-19",
    "priority": "High",
    "isCompleted": false,
    "date_time": "2025-11-17T14:00:00",
    "isExtended": false,
    "status": "Pending"
  }
]

] 

app.get("/api/get",(req,res)=>{
    res.json(todosList)
})

app.listen(port,()=>{
    console.log("Server Started Successfully....")
})