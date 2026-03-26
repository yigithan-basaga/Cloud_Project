import { useState } from "react";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [fieldError, setFieldError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setFieldError("Bos gorev eklenemez.");
      return;
    }

    if (trimmedTitle.length < 3) {
      setFieldError("Gorev basligi en az 3 karakter olmali.");
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
        <h2>Yeni gorev olustur</h2>
        <p>Kisa ve net bir gorev basligi gir.</p>
      </div>

      <form className="task-form premium-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="field-label" htmlFor="task-title">
            Gorev basligi
          </label>
          <input
            id="task-title"
            type="text"
            placeholder="Ornek: Musteri demo akisini son kez gozden gecir"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          {fieldError && <small className="field-error">{fieldError}</small>}
        </div>
        <button type="submit" className="primary-button">
          Gorevi olustur
        </button>
      </form>

      <div className="composer-footnote">
        <div>
          <span className="mini-label">Iyi pratik</span>
          <p>Tek satirda ne yapilacagini acik eden basliklar en iyi sonucu verir.</p>
        </div>
      </div>
    </section>
  );
}

export default TaskForm;
