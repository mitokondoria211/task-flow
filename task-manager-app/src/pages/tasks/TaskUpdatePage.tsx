import { useNavigate, useParams } from "react-router-dom";
import {
  useDetailTask,
  useUpdateTask,
} from "../../features/task/hooks/useTask";
import type { TaskInput } from "../../lib/validations/task";
import { toast } from "sonner";
import TaskForm from "../../components/tasks/TaskForm";

const TaskUpdatePage = () => {
  const { taskId } = useParams();
  const { data: task, isPending, isError, error } = useDetailTask(taskId);
  const updateMutation = useUpdateTask();
  const navigate = useNavigate();

  if (!taskId) return <p>IDがありません</p>;
  if (isPending) return <p>読み込み中...</p>;
  if (isError) return <p className="text-red-500">{error.message}</p>;
  if (!task) return <p>タスクが見つかりません</p>;

  const initialValues: TaskInput = {
    title: task.title,
    description: task.description,
    category: task.category,
    priority: task.priority,
    status: task.status,
    dueDate: task.dueDate,
  };

  const onSubmit = async (data: TaskInput) => {
    await updateMutation.mutateAsync(
      { id: taskId, data },
      {
        onSuccess: () => {
          toast.success("更新に成功しました");
          navigate("/tasks");
        },

        onError: (error) => {
          toast.error("更新に失敗しました");
          throw error;
        },
      },
    );
  };
  return (
    <div className="flex justify-center mt-4">
      <TaskForm
        title="編集"
        initialValues={initialValues}
        onSubmit={onSubmit}
        submitLabel="更新"
      />
    </div>
  );
};

export default TaskUpdatePage;
