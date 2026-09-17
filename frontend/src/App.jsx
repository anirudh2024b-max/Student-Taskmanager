import { useEffect, useMemo, useState } from "react";

import Navbar from "./components/Navbar.jsx";
import Stats from "./components/Stats.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";

import {
  createTask,
  deleteTask as deleteTaskRequest,
  getTasks,
  toggleTask as toggleTaskRequest,
  updateTask as updateTaskRequest,
} from "./services/taskapi.js";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true);
        setError("");

        const data = await getTasks();
        setTasks(data);
      } catch (requestError) {
        console.error(requestError);
        setError(
          "Could not connect to the backend. Make sure FastAPI is running."
        );
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  async function addTask(taskData) {
    try {
      setError("");

      const savedTask = await createTask({
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        due_date: taskData.dueDate || null,
      });

      setTasks((currentTasks) => [savedTask, ...currentTasks]);
      setShowForm(false);
    } catch (requestError) {
      console.error(requestError);
      setError("Could not create the task.");
    }
  }

  async function updateTask(taskData) {
    if (!editingTask) return;

    try {
      setError("");

      const updatedTask = await updateTaskRequest(editingTask.id, {
        title: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
        due_date: taskData.dueDate || null,
      });

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );

      setEditingTask(null);
      setShowForm(false);
    } catch (requestError) {
      console.error(requestError);
      setError("Could not update the task.");
    }
  }

  async function deleteTask(taskId) {
    const task = tasks.find((item) => item.id === taskId);

    if (!task) return;

    if (!window.confirm(`Delete "${task.title}"?`)) return;

    try {
      setError("");

      await deleteTaskRequest(taskId);

      setTasks((currentTasks) =>
        currentTasks.filter((item) => item.id !== taskId)
      );
    } catch (requestError) {
      console.error(requestError);
      setError("Could not delete the task.");
    }
  }

  async function toggleTask(taskId) {
    try {
      setError("");

      const updatedTask = await toggleTaskRequest(taskId);

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (requestError) {
      console.error(requestError);
      setError("Could not update task status.");
    }
  }

  function openAddForm() {
    setEditingTask(null);
    setShowForm(true);
  }

  function openEditForm(task) {
    setEditingTask(task);
    setShowForm(true);
  }

  function closeForm() {
    setEditingTask(null);
    setShowForm(false);
  }

  const filteredTasks = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return tasks.filter((task) => {
      const title = task.title?.toLowerCase() || "";
      const description = task.description?.toLowerCase() || "";

      const matchesSearch =
        title.includes(search) || description.includes(search);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "pending" && !task.completed) ||
        (statusFilter === "completed" && task.completed);

      const matchesPriority =
        priorityFilter === "all" ||
        task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchTerm, statusFilter, priorityFilter]);

  return (
    <>
      <Navbar />

      <main className="page-container" id="dashboard">
        <header className="page-header">
          <div>
            <h1>Good evening, student!</h1>
            <p>Plan your academic and personal tasks efficiently.</p>
          </div>

          <button className="primary-button" onClick={openAddForm}>
            + Add Task
          </button>
        </header>

        {error && <p className="error-message">{error}</p>}

        <Stats tasks={tasks} />

        <section className="main-grid">
          {showForm && (
            <TaskForm
              task={editingTask}
              onSubmit={editingTask ? updateTask : addTask}
              onCancel={closeForm}
            />
          )}

          <section className="task-area">
            {loading ? (
              <div className="panel empty-state">
                <p>Loading tasks...</p>
              </div>
            ) : (
              <TaskList
                tasks={filteredTasks}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                priorityFilter={priorityFilter}
                setPriorityFilter={setPriorityFilter}
                onToggle={toggleTask}
                onEdit={openEditForm}
                onDelete={deleteTask}
              />
            )}
          </section>
        </section>
      </main>
    </>
  );
}

export default App;