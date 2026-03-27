import { useEffect, useState } from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import StatusMessage from "./components/StatusMessage";
import { createTask, deleteTaskById, fetchTasks, updateTaskById } from "./services/taskService";

const FILTER_OPTIONS = ["all", "active", "completed"];

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  async function loadTasks() {
    try {
      setLoading(true);
      clearMessage();
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      showMessage("error", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  function showMessage(type, text) {
    setMessage({ type, text });
  }

  function clearMessage() {
    setMessage({ type: "", text: "" });
  }

  async function handleAddTask(title) {
    try {
      clearMessage();
      const createdTask = await createTask(title);
      setTasks((currentTasks) => [createdTask, ...currentTasks]);
      showMessage("success", "G\u00f6rev ba\u015far\u0131yla eklendi.");
      return true;
    } catch (error) {
      showMessage("error", error.message);
      return false;
    }
  }

  async function handleDeleteTask(id) {
    try {
      clearMessage();
      await deleteTaskById(id);
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
      showMessage("success", "G\u00f6rev silindi.");
    } catch (error) {
      showMessage("error", error.message);
    }
  }

  async function handleUpdateTask(id, title, completed) {
    try {
      clearMessage();
      const updatedTask = await updateTaskById(id, title, completed);
      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === id ? updatedTask : task))
      );
      showMessage("success", "G\u00f6rev g\u00fcncellendi.");
      return true;
    } catch (error) {
      showMessage("error", error.message);
      return false;
    }
  }

  const completedCount = tasks.filter((task) => task.completed).length;
  const activeCount = tasks.length - completedCount;
  const completionRate = tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(normalizedSearchQuery);
    const matchesFilter =
      statusFilter === "all" ||
      (statusFilter === "active" && !task.completed) ||
      (statusFilter === "completed" && task.completed);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="page-shell">
      <main className="app-shell">
        <Header
          totalCount={tasks.length}
          completedCount={completedCount}
          activeCount={activeCount}
          completionRate={completionRate}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          filterOptions={FILTER_OPTIONS}
          onStatusFilterChange={setStatusFilter}
        />

        <StatusMessage type={message.type} text={message.text} />

        <section className="dashboard-grid">
          <TaskForm onAddTask={handleAddTask} />

          {loading ? (
            <section className="panel panel-loading">
              <div className="panel-heading">
                <span className="panel-kicker">Workspace</span>
                <h2>{"\u00c7al\u0131\u015fma alan\u0131 y\u00fckleniyor"}</h2>
                <p>{"G\u00f6revleriniz premium pano \u00fczerine yerle\u015ftiriliyor."}</p>
              </div>
              <StatusMessage type="info" text={"G\u00f6revler y\u00fckleniyor..."} />
            </section>
          ) : (
            <TaskList
              tasks={filteredTasks}
              totalTasks={tasks.length}
              activeCount={activeCount}
              completedCount={completedCount}
              searchQuery={searchQuery}
              statusFilter={statusFilter}
              onDeleteTask={handleDeleteTask}
              onUpdateTask={handleUpdateTask}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
