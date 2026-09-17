const API_URL = "http://127.0.0.1:8000/api/tasks";

async function handleResponse(response) {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "API request failed");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function getTasks() {
  const response = await fetch(`${API_URL}/`);
  return handleResponse(response);
}

export async function createTask(taskData) {
  const response = await fetch(`${API_URL}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  return handleResponse(response);
}

export async function updateTask(taskId, taskData) {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  return handleResponse(response);
}

export async function toggleTask(taskId) {
  const response = await fetch(`${API_URL}/${taskId}/complete`, {
    method: "PATCH",
  });

  return handleResponse(response);
}

export async function deleteTask(taskId) {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: "DELETE",
  });

  return handleResponse(response);
}