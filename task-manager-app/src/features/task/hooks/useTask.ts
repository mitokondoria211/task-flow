import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { TaskSearchParams } from "../../../types/tasks";
import {
  createTask,
  deleteTask,
  getTaskById,
  patchTask,
  searchTasks,
  updateTask,
} from "../../../lib/api/taskApi";
import type { Priority, TaskInput } from "../../../lib/validations/task";
import { expiredTask } from "../../../lib/task/expiredTask";

export const useTasks = (params: TaskSearchParams) => {
  return useQuery({
    queryKey: ["tasks", "list", params],
    queryFn: () => searchTasks(params),
    retry: false,
  });
};

export const useDetailTask = (taskId?: string) => {
  return useQuery({
    queryKey: ["tasks", "detail", taskId],
    queryFn: () => getTaskById(taskId!),
    enabled: !!taskId,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
};
export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TaskInput }) =>
      updateTask(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
};
export const usePatchTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TaskInput }) =>
      patchTask(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTask,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
};

export const useTasksByPriority = (
  priority: Priority,
  isCompleted = false,
  isExpried = false,
) => {
  const params: TaskSearchParams = { priority };
  const filterTasks = async () => {
    const tasks = await searchTasks(params);
    if (isExpried) return tasks;
    return tasks.filter((task) => !expiredTask(task, isCompleted));
  };
  return useQuery({
    queryKey: ["tasks", "list", priority, isCompleted, isExpried],
    queryFn: filterTasks,
    retry: false,
  });
};
export const useHighTask = (isExpried = false) => {
  const params: TaskSearchParams = { priority: "HIGH" };
  const highTasks = async () => {
    const tasks = await searchTasks(params);
    if (isExpried) return tasks;
    return tasks.filter((task) => !expiredTask(task));
  };
  return useQuery({
    queryKey: ["tasks", "list", "HIGH", isExpried],
    queryFn: highTasks,
    retry: false,
  });
};
export const useMiddleTask = (isExpried = false) => {
  const params: TaskSearchParams = { priority: "MIDDLE" };
  const middleTasks = async () => {
    const tasks = await searchTasks(params);
    if (isExpried) return tasks;
    return tasks.filter((task) => !expiredTask(task));
  };
  return useQuery({
    queryKey: ["tasks", "list", "MIDDLE", isExpried],
    queryFn: middleTasks,
    retry: false,
  });
};
export const useLowTask = (isExpried = false) => {
  const params: TaskSearchParams = { priority: "LOW" };
  const lowTasks = async () => {
    const tasks = await searchTasks(params);
    if (isExpried) return tasks;
    return tasks.filter((task) => !expiredTask(task));
  };
  return useQuery({
    queryKey: ["tasks", "list", "LOW", isExpried],
    queryFn: lowTasks,
    retry: false,
  });
};
