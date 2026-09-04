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
  taskPriorityItems,
  taskStatusItems,
  type PatchTaskInput,
  type Priority,
  type TaskStatus,
} from "../../lib/validations/task";
import { useNavigate } from "react-router-dom";
import { useDeleteTask, usePatchTask } from "../../features/task/hooks/useTask";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Calendar,
  Circle,
  EllipsisVertical,
  PencilIcon,
  Tag,
} from "lucide-react";
import DeleteDialog from "./DeleteDialog";
import { isDueSoon, isExpiredTask } from "../../lib/task/expiredTask";
import { Badge } from "../ui/badge";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
  const patchMutation = usePatchTask();

  const patchTask = async (data: PatchTaskInput, patchLabel: string) => {
    await patchMutation.mutateAsync(
      { id: task.id, data },
      {
        onSuccess: () => {
          toast.success(`${patchLabel}の更新に成功しました`);
          // navigate("/dashboard");
        },
        onError: (error) => {
          toast.error(`${patchLabel}の更新に失敗しました`);
          throw error;
        },
      },
    );
  };

  const displayDueDateStatus = () => {
    if (isExpiredTask(task)) {
      return <Badge>期限切れ</Badge>;
    }
    if (isDueSoon(task)) {
      return <Badge>期限間近</Badge>;
    }
  };

  const handleStatusSelectChange = async (status: TaskStatus | null) => {
    if (!status) return;
    await patchTask({ status }, "ステータス");
  };
  const handlePrioritySelectChange = async (priority: Priority | null) => {
    if (!priority) return;
    await patchTask({ priority }, "優先度");
  };

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
        return "border-2 border-l-red-500";
      case "MIDDLE":
        return "border-2 border-l-yellow-200";
      case "LOW":
        return "border-2 border-l-green-300";
      default:
        return "";
    }
  };
  const cirlePrimaryColorChange = (priority: Priority) => {
    switch (priority) {
      case "HIGH":
        return "size-3 fill-red-500 stroke-red-500";
      case "MIDDLE":
        return "size-3 fill-orange-500 stroke-orange-500";
      case "LOW":
        return "size-3 fill-green-500 stroke-green-500";
      default:
        return "size-3 fill-gray-500 stroke-gray-500";
    }
  };
  const cirleStatusColorChange = (status: TaskStatus) => {
    switch (status) {
      case "INITIATION":
        return "size-3 fill-gray-400 stroke-gray-400";
      case "IN_PROGRESS":
        return "size-3 fill-blue-500 stroke-blue-500";
      case "PENDING":
        return "size-3 fill-amber-500 stroke-amber-500";
      case "COMPLETED":
        return "size-3 fill-green-500 stroke-green-500";
      default:
        return "size-3 fill-red-500 stroke-red-500";
    }
  };
  return (
    <Card
      key={task.id}
      className={` ${borderColorChange(task.priority)} rounded-sm w-xs flex flex-col gap-2`}
      onClick={() => {
        if (!isClick) return;
        navigate(`/tasks/${task.id}`);
      }}
    >
      <CardHeader className="mt-0 pt-0">
        <CardTitle>
          <div className="flex justify-between items-center">
            <Badge className=" bg-blue-50  text-blue-700">
              <Tag className="size-4" />
              {categoryLabels[task.category]}
            </Badge>

            <EllipsisVertical />
          </div>
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
      <CardContent className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <p className="text-sm">{displayLongDescription(task.description)}</p>
        <div className="flex gap-4 text-xs">
          <p className="flex gap-2 items-center">
            <Calendar className="size-3.5" />
            {task.dueDate}
          </p>
          {displayDueDateStatus()}
        </div>
      </CardContent>
      <CardFooter className="flex gap-4 justify-between py-3 bg-white">
        <div className="flex-1">
          <Label className="text-xs">優先度</Label>
          <Select
            items={taskPriorityItems}
            onValueChange={handlePrioritySelectChange}
            value={task.priority}
          >
            <SelectTrigger className="w-full max-w-48">
              <div className="flex items-center gap-2">
                <Circle className={cirlePrimaryColorChange(task.priority)} />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent align="start" alignItemWithTrigger={false}>
              <SelectGroup>
                <SelectLabel>優先度</SelectLabel>
                {taskPriorityItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    <div className="flex gap-2 justify-center items-center">
                      <Circle className={cirlePrimaryColorChange(item.value)} />
                      {item.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Label className="text-xs">ステータス</Label>
          <Select
            items={taskStatusItems}
            onValueChange={handleStatusSelectChange}
            value={task.status}
          >
            <SelectTrigger className="w-full max-w-48">
              <div className="flex items-center gap-2">
                <Circle className={cirleStatusColorChange(task.status)} />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent align="start" alignItemWithTrigger={false}>
              <SelectGroup>
                <SelectLabel>ステータス</SelectLabel>
                {taskStatusItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    <div className="flex items-center gap-2">
                      <Circle className={cirleStatusColorChange(item.value)} />
                      {item.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
