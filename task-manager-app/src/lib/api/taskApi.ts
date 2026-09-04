import type { Task, TaskSearchParams } from "../../types/tasks";
import type { PatchTaskInput, TaskInput } from "../validations/task";

const VITE_API_BASE_URL = "http://localhost:3001/tasks";

export const searchTasks = async ({
  title,
  category,
  priority,
  status,
  sort = "dueDate",
}: TaskSearchParams): Promise<Task[]> => {
  const params = new URLSearchParams();

  if (title) {
    params.set("title:contains", title);
  }
  if (category) {
    params.set("category", category);
  }
  if (priority) {
    params.set("priority", priority);
  }
  if (status) {
    params.set("status", status);
  }

  params.set("_sort", sort ?? "dueDate");

  const response = await fetch(`${VITE_API_BASE_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error("タスクの取得に失敗しました");
  }
  console.log(response);

  const data: Task[] = await response.json();
  console.log(data);
  return data;
};

export const getTaskById = async (id: string): Promise<Task> => {
  const response = await fetch(`${VITE_API_BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error("タスクの取得に失敗しました");
  }
  const data: Task = await response.json();
  return data;
};

export const createTask = async (request: TaskInput): Promise<Task> => {
  const response = await fetch(VITE_API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("登録に失敗しました");
  }

  const data: Task = await response.json();
  return data;
};

export const updateTask = async (
  id: string,
  request: TaskInput,
): Promise<Task> => {
  const response = await fetch(`${VITE_API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("更新に失敗しました");
  }

  const data: Task = await response.json();
  return data;
};
export const patchTask = async (
  id: string,
  request: PatchTaskInput,
): Promise<Task> => {
  const response = await fetch(`${VITE_API_BASE_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("更新に失敗しました");
  }

  const data: Task = await response.json();
  return data;
};

export const deleteTask = async (id: string): Promise<void> => {
  const response = await fetch(`${VITE_API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("削除に失敗しました");
  }
};
