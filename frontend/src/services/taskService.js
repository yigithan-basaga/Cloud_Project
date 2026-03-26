const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const API_URL = `${API_BASE_URL.replace(/\/$/, "")}/tasks`;

async function parseResponse(response, defaultMessage) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || defaultMessage);
  }

  return data;
}

export async function fetchTasks() {
  const response = await fetch(API_URL);
  return parseResponse(response, "Gorevler alinamadi.");
}

export async function createTask(title) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  return parseResponse(response, "Gorev eklenemedi.");
}

export async function updateTaskById(id, title, completed) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, completed }),
  });

  return parseResponse(response, "Gorev guncellenemedi.");
}

export async function deleteTaskById(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return parseResponse(response, "Gorev silinemedi.");
}
