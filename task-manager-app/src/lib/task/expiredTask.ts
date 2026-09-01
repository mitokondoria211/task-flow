import { isBefore, parseISO } from "date-fns";
import type { Task } from "../../types/tasks";
export const expiredTask = (task: Task, isCompleted = false) => {
  const today = new Date();
  const dueDate = parseISO(task.dueDate);
  console.log(today, dueDate, isBefore(dueDate, today));
  if (!isCompleted) return isBefore(dueDate, today);
  return isBefore(dueDate, today) && task.status !== "COMPLETED";
};
