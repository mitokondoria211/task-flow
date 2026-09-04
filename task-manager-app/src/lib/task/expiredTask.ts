import { differenceInDays, isBefore, parseISO } from "date-fns";
import type { Task } from "../../types/tasks";
export const isExpiredTask = (task: Task) => {
  const today = new Date();
  const dueDate = parseISO(task.dueDate);
  return isBefore(dueDate, today) && task.status !== "COMPLETED";
};

//期限まであと何日か
export const daysUntilDue = (task: Task) => {
  const today = new Date();
  const dueDate = parseISO(task.dueDate);
  return differenceInDays(dueDate, today);
};
//期限が近いかどうか
export const isDueSoon = (task: Task) => {
  const UNTIL_DAYS = 3;
  return 0 < daysUntilDue(task) && daysUntilDue(task) <= UNTIL_DAYS;
};
//期限が近いタスク一覧
export const dueSoonTasks = (tasks: Task[]) => {
  return tasks.filter((task) => isDueSoon(task));
};
