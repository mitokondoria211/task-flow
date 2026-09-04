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
import type {
  PatchTaskInput,
  Priority,
  TaskInput,
} from "../../../lib/validations/task";
import { isExpiredTask } from "../../../lib/task/expiredTask";

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
        queryKey: ["tasks", "list"],
      });
    },
  });
};
export const usePatchTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: PatchTaskInput }) =>
      patchTask(id, data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["tasks", "list"],
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
    if (!isCompleted && !isExpried) {
      const filtered = tasks.filter(
        (task) => task.status !== "COMPLETED" && !isExpiredTask(task),
      );
      return filtered;
    }

    if (!isCompleted && isExpried) {
      return tasks.filter((task) => task.status !== "COMPLETED");
    }

    if (isCompleted && !isExpried) {
      return tasks.filter((task) => !isExpiredTask(task));
    }

    return tasks;
  };
  return useQuery({
    queryKey: ["tasks", "list", priority, isCompleted, isExpried],
    queryFn: filterTasks,
    retry: false,
  });
};
