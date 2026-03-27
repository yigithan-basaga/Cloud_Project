import { useState } from "react";

function TaskItem({ task, onDeleteTask, onUpdateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState(task.title);
  const [fieldError, setFieldError] = useState("");

  async function handleSave() {
    const trimmedTitle = editingTitle.trim();

    if (!trimmedTitle) {
      setFieldError("Bo\u015f g\u00f6rev kaydedilemez.");
      return;
    }

    if (trimmedTitle.length < 3) {
      setFieldError("G\u00f6rev ba\u015fl\u0131\u011f\u0131 en az 3 karakter olmal\u0131.");
      return;
    }

    setFieldError("");
    const isUpdated = await onUpdateTask(task.id, trimmedTitle, task.completed);

    if (isUpdated) {
      setIsEditing(false);
    }
  }

  async function handleToggle() {
    await onUpdateTask(task.id, task.title, !task.completed);
  }

  function handleCancel() {
    setEditingTitle(task.title);
    setFieldError("");
    setIsEditing(false);
  }

  return (
    <li className={`task-item ${task.completed ? "is-completed" : ""}`}>
      <div className="task-item-topline">
        <label className="task-check">
          <input type="checkbox" checked={task.completed} onChange={handleToggle} />
          <span className="custom-check" aria-hidden="true" />
        </label>

        <div className="task-item-meta">
          <span className={`badge ${task.completed ? "done" : "progress"}`}>
            {task.completed ? "Tamamland\u0131" : "Devam ediyor"}
          </span>
          <small>{new Date(task.created_at).toLocaleString("tr-TR")}</small>
        </div>
      </div>

      <div className="task-body">
        {isEditing ? (
          <div className="edit-area">
            <label className="field-label" htmlFor={`edit-task-${task.id}`}>
              {"G\u00f6revi d\u00fczenle"}
            </label>
            <input
              id={`edit-task-${task.id}`}
              className="edit-input"
              value={editingTitle}
              onChange={(event) => setEditingTitle(event.target.value)}
            />
            {fieldError && <small className="field-error">{fieldError}</small>}
          </div>
        ) : (
          <>
            <div className="task-title-row">
              <h3 className={task.completed ? "completed" : ""}>{task.title}</h3>
            </div>
            <p className="task-caption">{task.completed ? "Tamamlanan i\u015f" : "A\u00e7\u0131k i\u015f"}</p>
          </>
        )}
      </div>

      <div className="task-actions">
        {isEditing ? (
          <>
            <button type="button" className="secondary" onClick={handleSave}>
              Kaydet
            </button>
            <button type="button" className="ghost" onClick={handleCancel}>
              {"Vazge\u00e7"}
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="secondary"
              onClick={() => {
                setEditingTitle(task.title);
                setFieldError("");
                setIsEditing(true);
              }}
            >
              {"D\u00fczenle"}
            </button>
            <button type="button" className="danger" onClick={() => onDeleteTask(task.id)}>
              Sil
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default TaskItem;
