import { useParams } from "react-router-dom";
import { useDetailTask } from "../../features/task/hooks/useTask";
import TaskCard from "../../components/tasks/TaskCard";

const TaskDetailPage = () => {
  const { taskId } = useParams();
  const { data: task, isPending, isError, error } = useDetailTask(taskId);
  if (!taskId) return <p>IDがありません</p>;
  if (isPending) return <p>読み込み中</p>;
  if (isError) return <p className="text-red-500">{error.message}</p>;
  return (
    <div className="flex flex-col justify-center gap-4 mt-4">
      <h2>{task?.title}の詳細</h2>
      {task && (
        <TaskCard task={task} isDetail={true} isEdit={true} isClick={true} />
      )}
    </div>
  );
};

export default TaskDetailPage;
