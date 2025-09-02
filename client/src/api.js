const BASE = import.meta.env.VITE_API || "http://localhost:4000/api";

export const getTasks = () => fetch(`${BASE}/tasks`).then((r) => r.json());
export const addTask = (title) =>
  fetch(`${BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  }).then((r) => r.json());
export const toggleTask = (id) =>
  fetch(`${BASE}/tasks/${id}/toggle`, { method: "PATCH" }).then((r) =>
    r.json()
  );
export const deleteTask = (id) =>
  fetch(`${BASE}/tasks/${id}`, { method: "DELETE" }).then((r) => r.json());
