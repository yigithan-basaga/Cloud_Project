const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN;

const corsOptions = CLIENT_ORIGIN
  ? {
      origin: CLIENT_ORIGIN,
    }
  : undefined;

app.use(cors(corsOptions));
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/tasks", (req, res) => {
  db.all(
    "SELECT id, title, completed, created_at FROM tasks ORDER BY id DESC",
    [],
    (error, rows) => {
      if (error) {
        return res.status(500).json({ message: "Gorevler alinamadi." });
      }

      const tasks = rows.map((task) => ({
        ...task,
        completed: Boolean(task.completed),
      }));

      res.json(tasks);
    }
  );
});

app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ message: "Gorev basligi bos olamaz." });
  }

  const trimmedTitle = title.trim();

  db.run(
    "INSERT INTO tasks (title, completed) VALUES (?, 0)",
    [trimmedTitle],
    function onInsert(error) {
      if (error) {
        return res.status(500).json({ message: "Gorev eklenemedi." });
      }

      db.get(
        "SELECT id, title, completed, created_at FROM tasks WHERE id = ?",
        [this.lastID],
        (selectError, row) => {
          if (selectError) {
            return res.status(500).json({ message: "Eklenen gorev alinamadi." });
          }

          res.status(201).json({
            ...row,
            completed: Boolean(row.completed),
          });
        }
      );
    }
  );
});

app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ message: "Gorev basligi bos olamaz." });
  }

  db.run(
    "UPDATE tasks SET title = ?, completed = ? WHERE id = ?",
    [title.trim(), completed ? 1 : 0, id],
    function onUpdate(error) {
      if (error) {
        return res.status(500).json({ message: "Gorev guncellenemedi." });
      }

      if (this.changes === 0) {
        return res.status(404).json({ message: "Gorev bulunamadi." });
      }

      db.get(
        "SELECT id, title, completed, created_at FROM tasks WHERE id = ?",
        [id],
        (selectError, row) => {
          if (selectError) {
            return res.status(500).json({ message: "Guncel gorev alinamadi." });
          }

          res.json({
            ...row,
            completed: Boolean(row.completed),
          });
        }
      );
    }
  );
});

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM tasks WHERE id = ?", [id], function onDelete(error) {
    if (error) {
      return res.status(500).json({ message: "Gorev silinemedi." });
    }

    if (this.changes === 0) {
      return res.status(404).json({ message: "Gorev bulunamadi." });
    }

    res.json({ message: "Gorev silindi." });
  });
});

app.listen(PORT, () => {
  console.log(`Backend calisiyor: http://0.0.0.0:${PORT}`);
});
