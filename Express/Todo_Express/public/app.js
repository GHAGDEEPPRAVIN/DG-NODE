async function loadTasks() {
    const res = await fetch("/tasks");
    const tasks = await res.json();

    const container = document.getElementById("task-container");
    container.innerHTML = "";

    tasks.forEach(task => {
        const div = document.createElement("div");
        div.className = "task-card " + 
                        (task.isCompleted ? "completed" : "") + 
                        (task.isExtended ? " extended" : "");

        div.innerHTML = `
            <h3 class="task-title">${task.title}</h3>
            <p class="task-desc">${task.description}</p>

            <div>
                <span class="badge priority-${task.priority.toLowerCase()}">Priority: ${task.priority}</span>
                <span class="badge status-badge">${task.status}</span>
            </div>

            <p><strong>Deadline:</strong> ${task.dead_line}</p>

            <div class="btn-row">
                <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        container.appendChild(div);
    });
}

// 🟦 DELETE TASK
async function deleteTask(id) {
    if (!confirm("Are you sure you want to delete this task?")) return;

    await fetch(`/tasks/${id}`, { method: "DELETE" });
    loadTasks();
}

// 🟩 EDIT TASK (simple prompt-based)
async function editTask(id) {
    const title = prompt("New Title:");
    const description = prompt("New Description:");

    if (!title || !description) return alert("Both fields required!");

    await fetch(`/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description })
    });

    loadTasks();
}

loadTasks();
