import type { Task } from "../../types/tasks";
import { isExpiredTask } from "./expiredTask";

export const allTasksCount = (tasks: Task[]) => {
  return tasks.length;
};

export const unCompletedTasksCount = (tasks: Task[]) => {
  const filtered = tasks.filter((task) => task.status !== "COMPLETED");
  return filtered.length;
};

export const completedTasksCount = (tasks: Task[]) => {
  const filtered = tasks.filter((task) => task.status === "COMPLETED");
  return filtered.length;
};
export const expiredTasksCount = (tasks: Task[]) => {
  const filtered = tasks.filter((task) => isExpiredTask(task));
  return filtered.length;
};

export const taskStatistics = (tasks: Task[]) => {
  const allTasksSize = allTasksCount(tasks);
  const unCompletedTasksSize = unCompletedTasksCount(tasks);
  const completedTasksSize = completedTasksCount(tasks);
  const expiredTasksSize = completedTasksCount(tasks);

  return {
    allTasksSize,
    unCompletedTasksSize,
    completedTasksSize,
    expiredTasksSize,
  };
};
