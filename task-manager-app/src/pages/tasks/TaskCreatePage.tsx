import { toast } from "sonner";
import TaskForm from "../../components/tasks/TaskForm";
import { useCreateTask } from "../../features/task/hooks/useTask";
import type { TaskInput } from "../../lib/validations/task";

const TaskCreatePage = () => {
  const createMutation = useCreateTask();

  const onSubmit = async (data: TaskInput) => {
    await createMutation.mutateAsync(data, {
      onSuccess: () => {
        toast.success("登録に成功しました");
      },
      onError: (error) => {
        toast.error("登録に失敗しました");
        throw error;
      },
    });
  };
  return (
    <div className="flex justify-center mt-4">
      <TaskForm title={"新規登録"} onSubmit={onSubmit} submitLabel="登録" />
    </div>
  );
};

export default TaskCreatePage;
