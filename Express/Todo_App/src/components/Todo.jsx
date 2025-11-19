import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, updateTodo, setTodos } from "../features/todoSlice";

const API_URL = "http://localhost:1000/api/todos";

const Todo = () => {
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null); // TRACK EDIT MODE
  const todos = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("redux-todo", JSON.stringify(todos));
  }, [todos]);

  // Load todos from server
  useEffect(() => {
    const loadTodos = async () => {
      const res = await fetch(API_URL);
      const data = await res.json();
      dispatch(setTodos(data));
    };
    loadTodos();
  }, [dispatch]);

  // Add todo
  const handleAdd = useCallback(async () => {
    if (!title.trim()) return;

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    const newTodo = await res.json();
    dispatch(addTodo(newTodo));
    setTitle("");
  }, [title, dispatch]);

  // Update todo
  const handleUpdate = async () => {
    if (!title.trim()) return;

    const res = await fetch(`${API_URL}/${editId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    const updatedTodo = await res.json();

    dispatch(updateTodo({ id: editId, title: updatedTodo.title }));

    // Reset to add mode
    setEditId(null);
    setTitle("");
  };

  // When clicking edit button
  const startEdit = (todo) => {
    setTitle(todo.title); // auto-fill input
    setEditId(todo.id);   // mark edit mode
  };

  // Delete
  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      <div className="head">
        <input
          type="text"
          placeholder="Enter Your Todos"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* CHANGE BUTTON BASED ON editId */}
        {editId ? (
          <button onClick={handleUpdate} style={{ background: "#f39c12" }}>
            Update
          </button>
        ) : (
          <button onClick={handleAdd}>Add</button>
        )}
      </div>

      <table className="todoList">
        <thead>
          <tr>
            <th>Items</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>
                <input type="checkbox" checked={todo.status} readOnly />
              </td>

              {/* EDIT BUTTON */}
              <td>
                <button className="editBtn" onClick={() => startEdit(todo)}>
                  Edit
                </button>
              </td>

              {/* DELETE BUTTON */}
              <td>
                <button className="deleteBtn" onClick={() => handleDelete(todo.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Todo;
