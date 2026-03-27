import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [fieldError, setFieldError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setFieldError("Bo\u015f g\u00f6rev eklenemez.");
      return;
    }

    if (trimmedTitle.length < 3) {
      setFieldError("G\u00f6rev ba\u015fl\u0131\u011f\u0131 en az 3 karakter olmal\u0131.");
      return;
    }

    setFieldError("");
    const isAdded = await onAddTask(trimmedTitle);

    if (isAdded) {
      setTitle("");
    }
  }

  return (
    <section className="panel composer-panel">
      <div className="panel-heading">
        <span className="panel-kicker">New task</span>
        <h2>{"Yeni g\u00f6rev olu\u015ftur"}</h2>
        <p>{"K\u0131sa ve net bir g\u00f6rev ba\u015fl\u0131\u011f\u0131 gir."}</p>
      </div>

      <form className="task-form premium-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="field-label" htmlFor="task-title">
            {"G\u00f6rev ba\u015fl\u0131\u011f\u0131"}
          </label>
          <input
            id="task-title"
            type="text"
            placeholder={"\u00d6rnek: M\u00fc\u015fteri demo ak\u0131\u015f\u0131n\u0131 son kez g\u00f6zden ge\u00e7ir"}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          {fieldError && <small className="field-error">{fieldError}</small>}
        </div>
        <button type="submit" className="primary-button">
          {"G\u00f6revi olu\u015ftur"}
        </button>
      </form>

      <div className="composer-footnote">
        <div>
          <span className="mini-label">{"\u0130yi pratik"}</span>
          <p>{"Tek sat\u0131rda ne yap\u0131laca\u011f\u0131n\u0131 a\u00e7\u0131k eden ba\u015fl\u0131klar en iyi sonucu verir."}</p>
        </div>
      </div>
    </section>
  );
}

export default TaskForm;
