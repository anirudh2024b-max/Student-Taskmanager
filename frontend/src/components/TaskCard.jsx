function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const formattedDate = task.dueDate
    ? new Date(`${task.dueDate}T00:00:00`).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "No due date";

  return (
    <article className={`task-card ${task.completed ? "completed" : ""}`}>
      <div className="task-top">
        <div>
          <h3 className="task-title">{task.title}</h3>

          <p className="task-description">
            {task.description || "No description provided."}
          </p>
        </div>

        <span className={`badge priority-${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>

      <div className="task-meta">
        <span className="badge date-badge">Due: {formattedDate}</span>

        <span className="badge date-badge">
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      <div className="task-actions">
        <button className="complete-button" onClick={() => onToggle(task.id)}>
          {task.completed ? "Mark Pending" : "Complete"}
        </button>

        <button className="edit-button" onClick={() => onEdit(task)}>
          Edit
        </button>

        <button className="delete-button" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskCard;