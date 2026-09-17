function Stats({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const stats = [
    { label: "Total Tasks", value: totalTasks },
    { label: "Pending", value: pendingTasks },
    { label: "Completed", value: completedTasks },
    { label: "High Priority", value: highPriorityTasks },
  ];

  return (
    <section className="stats-grid">
      {stats.map((stat) => (
        <article className="stat-card" key={stat.label}>
          <p>{stat.label}</p>
          <h2>{stat.value}</h2>
        </article>
      ))}
    </section>
  );
}

export default Stats;