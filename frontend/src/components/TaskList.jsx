import TaskItem from "./TaskItem";

function TaskList({
  tasks,
  totalTasks,
  activeCount,
  completedCount,
  searchQuery,
  statusFilter,
  onDeleteTask,
  onUpdateTask,
}) {
  if (tasks.length === 0) {
    return (
      <section className="panel empty-panel">
        <div className="empty-state-visual" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="empty-state-copy">
          <h2>{"G\u00f6r\u00fcnt\u00fclenecek g\u00f6rev bulunamad\u0131"}</h2>
          <p>
            {totalTasks === 0
              ? "Yeni bir g\u00f6rev olu\u015fturarak \u00e7al\u0131\u015fma alan\u0131n\u0131 ba\u015flat."
              : "Arama veya filtre se\u00e7imi sonucu liste bo\u015f kald\u0131. Filtreleri geni\u015fletmeyi dene."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="panel list-panel">
      <div className="list-panel-header">
        <div className="panel-heading">
          <span className="panel-kicker">Workspace</span>
          <h2>{"G\u00f6rev listesi"}</h2>
          <p>{"T\u00fcm i\u015fleri tek bir d\u00fczenli ak\u0131\u015fta takip et."}</p>
        </div>
      </div>

      <div className="list-meta">
        <span>
          {statusFilter === "all"
            ? "T\u00fcm g\u00f6revler"
            : statusFilter === "active"
              ? "Aktif g\u00f6revler"
              : "Tamamlanan g\u00f6revler"}
        </span>
        <span>
          {searchQuery
            ? `"${searchQuery}" i\u00e7in ${tasks.length} sonu\u00e7`
            : `${activeCount} aktif, ${completedCount} tamam`}
        </span>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDeleteTask={onDeleteTask}
            onUpdateTask={onUpdateTask}
          />
        ))}
      </ul>
    </section>
  );
}

export default TaskList;
