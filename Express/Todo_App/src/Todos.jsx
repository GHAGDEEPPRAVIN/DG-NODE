import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  changeStatus,
  deleteTodo,
  updateTodo,
  setTodos,
} from "../features/todo";
import Modal from "./Modal";

const API_URL = "http://localhost:3000/api/todos";

const Todo = () => {
  const [title, setTitle] = useState("");
  const todos = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  // Persiting Todo.
  useEffect(() => {
    localStorage.setItem("redux-todo", JSON.stringify(todos));
  }, [todos]);

  // Add Todo.
  const handleAdd = useCallback(async () => {
    if (title.trim() === "") return;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) {
        console.error("Failed to add todo on server");
        return;
      }

      const newTodo = await res.json();

      dispatch(addTodo(newTodo));

      setTitle("");
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  }, [title, dispatch]);

  // Update Todo.
  const handleUpdate = async (id, newTitle) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });

      if (!res.ok) {
        console.error("Failed to update todo on server");
        return;
      }

      const updatedTodo = await res.json();
      dispatch(updateTodo({ id, title: updatedTodo.title }));
    } catch (err) {
      console.error("Error updating todo:", err);
    }
  };

  // Delete Todo.
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        console.error("Failed to delete todo on server");
        return;
      }

      dispatch(deleteTodo(id));
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  };
}