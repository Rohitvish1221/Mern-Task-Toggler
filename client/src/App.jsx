import React, { useEffect, useState } from "react";
import { getTasks, addTask, toggleTask, deleteTask } from "./api";
import { TrashIcon } from "@heroicons/react/24/solid"; // ✅ import trash icon

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  async function refresh() {
    setTasks(await getTasks());
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Task title cannot be empty!");
      return;
    }
    setError("");
    await addTask(title.trim());
    setTitle("");
    refresh();
  }

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.done;
    if (filter === "done") return t.done;
    return true;
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          ✅ Task Toggler
        </h1>

        {/* Add task form */}
        <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New task..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add
          </button>
        </form>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Filter buttons */}
        <div className="flex gap-2 mt-4 justify-center flex-wrap">
          {["all", "active", "done"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg text-sm ${
                filter === f
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Task list */}
        {filteredTasks.length === 0 ? (
          <p className="mt-6 text-gray-500 text-center">No tasks found.</p>
        ) : (
          <ul className="mt-6 divide-y divide-gray-200">
            {filteredTasks.map((t) => (
              <li key={t._id} className="flex items-center gap-3 py-2">
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => toggleTask(t._id).then(refresh)}
                  className="h-4 w-4 text-blue-500"
                />
                <span
                  className={`flex-1 ${
                    t.done ? "line-through text-gray-400" : "text-gray-800"
                  }`}
                >
                  {t.title}
                </span>
                {/* Delete button with trash icon */}
                <button
                  onClick={() => deleteTask(t._id).then(refresh)}
                  className="p-1 text-red-500 hover:bg-red-100 rounded"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
