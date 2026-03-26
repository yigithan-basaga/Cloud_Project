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
          <h2>Goruntulenecek gorev bulunamadi</h2>
          <p>
            {totalTasks === 0
              ? "Yeni bir gorev olusturarak calisma alanini baslat."
              : "Arama veya filtre secimi sonucu liste bos kaldi. Filtreleri genisletmeyi dene."}
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
          <h2>Gorev listesi</h2>
          <p>Tum isleri tek bir duzenli akista takip et.</p>
        </div>
      </div>

      <div className="list-meta">
        <span>
          {statusFilter === "all"
            ? "Tum gorevler"
            : statusFilter === "active"
              ? "Aktif gorevler"
              : "Tamamlanan gorevler"}
        </span>
        <span>
          {searchQuery
            ? `"${searchQuery}" icin ${tasks.length} sonuc`
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
