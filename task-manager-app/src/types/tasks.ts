import type { Category, Priority, TaskStatus } from "../lib/validations/task";

export type Task = {
  id: string;
  title: string;
  description: string;
  category: Category;
  priority: Priority;
  status: TaskStatus;
  dueDate: string;
};

export type TaskSearchParams = {
  title?: string;
  category?: Category;
  priority?: Priority;
  status?: TaskStatus;
  sort?: TaskSort;
};

export const taskSortValues = ["dueDate", "-dueDate", "-priority"] as const;
export type TaskSort = "dueDate" | "-dueDate" | "-priority";

export const taskSortLabels: Record<TaskSort, string> = {
  dueDate: "期限の近い順",
  "-dueDate": "期限が遠い順",
  "-priority": "優先度順",
};
export const taskSortItems = taskSortValues.map((value) => ({
  value,
  label: taskSortLabels[value],
}));
