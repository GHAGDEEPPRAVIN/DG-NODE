import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json()); 

let TodoList = [
    { id: 1, title: "Todo App", status: true },
    { id: 2, title: "Node Js Project", status: true },
    { id: 3, title: "Redux Project", status: false },
    { id: 4, title: "Homework", status: false }
];

// Fetch all todos data
app.get("/api/todos", (req, res) => {
    res.json(TodoList);
});

// Add todo
app.post("/api/todos", (req, res) => {
    const { title } = req.body;S

    const newTodo = {
        id: Date.now(),
        title,
        status: false
    };

    TodoList.push(newTodo);
    res.status(201).json(newTodo);
});

// Update todo
app.patch("/api/todos/:id", (req, res) => {
    const id = Number(req.params.id);
    const { title } = req.body;

    const todo = TodoList.find((t) => t.id === id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    todo.title = title ?? todo.title;
    res.json(todo);
});

// Delete todo
app.delete("/api/todos/:id", (req, res) => {
    const id = Number(req.params.id);
    const exists = TodoList.some((t) => t.id === id);

    if (!exists) return res.status(404).json({ message: "Todo not found" });

    TodoList = TodoList.filter((t) => t.id !== id);
    res.json({ success: true });
});

app.listen(1000, () => {
    console.log("Server running on port 1000");
});
