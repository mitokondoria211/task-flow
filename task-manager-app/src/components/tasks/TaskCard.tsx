import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import type { Task } from "../../types/tasks";
import {
  categoryLabels,
  priorityLabels,
  taskStatusLabels,
  type Priority,
} from "../../lib/validations/task";
import { useNavigate } from "react-router-dom";
import { useDeleteTask } from "../../features/task/hooks/useTask";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { PencilIcon, Tag } from "lucide-react";
import DeleteDialog from "./DeleteDialog";
import { expiredTask } from "../../lib/task/expiredTask";

type TaskCardProps = {
  task: Task;
  isEdit: boolean;
  isDetail?: boolean;
  isClick?: boolean;
};

const TaskCard = ({
  task,
  isEdit,
  isDetail = false,
  isClick = true,
}: TaskCardProps) => {
  const navigate = useNavigate();
  const deleteMutation = useDeleteTask();

  // const [status, setStatus] = useState<TaskStatus>(task.status);

  // const handleStatusSelectChange = (value: TaskStatus) => {};

  const handleDelete = async () => {
    deleteMutation.mutate(task.id, {
      onSuccess: () => {
        toast.success("削除が成功しました");
        navigate(`/tasks`);
      },
      onError: () => toast.error("削除に失敗しました"),
    });
  };

  const displayLongDescription = (text: string) => {
    if (isDetail) return text;

    return text.length >= 30 ? text.slice(0, 27) + "..." : text;
  };

  const borderColorChange = (priority: Priority) => {
    switch (priority) {
      case "HIGH":
        return "border-2 border-red-500";
      case "MIDDLE":
        return "border-2 border-yellow-200";
      case "LOW":
        return "border-2 border-green-300";
      default:
        return "";
    }
  };
  return (
    <Card
      key={task.id}
      className={`w-sm ${borderColorChange(task.priority)}`}
      onClick={() => {
        if (!isClick) return;
        navigate(`/tasks/${task.id}`);
      }}
    >
      <CardHeader>
        <CardTitle>
          <div className="flex items-center ">
            <h2 className="flex-8">{task.title}</h2>
            <p className="flex-2 text-center">
              {taskStatusLabels[task.status]}
            </p>
          </div>

          <div className="flex justify-between">
            {expiredTask(task) && <p>期限切れ</p>}
            <p className="flex">
              <Tag className="size-4" />
              {categoryLabels[task.category]}
            </p>
          </div>

          {/* <p>ステータス:{taskStatusLabels[task.status]}</p> */}
        </CardTitle>
        <CardAction className="flex gap-2">
          {isEdit && (
            <>
              <Button
                variant="outline"
                size="icon"
                aria-label={`${task.title}を編集`}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/tasks/${task.id}/edit`);
                }}
                onKeyDown={(e) => {
                  console.log(e.key, e.altKey);
                  if (e.key === "Enter" && e.altKey) {
                    console.log("Alt + Enter");
                    navigate(`/tasks/${task.id}/edit`);
                  }
                }}
              >
                <PencilIcon aria-hidden="true" />
              </Button>
              <DeleteDialog
                aria-label={`${task.title}を削除`}
                onDelete={handleDelete}
              />
            </>
          )}
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>{displayLongDescription(task.description)}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p>期限:{task.dueDate}</p>
        <p>優先度:{priorityLabels[task.priority]}</p>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
