import { Search } from "lucide-react";
import TaskCard from "../../components/tasks/TaskCard";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../../components/ui/input-group";
import { useTasks } from "../../features/task/hooks/useTask";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useState } from "react";
import { useDebounce } from "../../features/hooks/useDebounce";
import {
  taskSortItems,
  type TaskSearchParams,
  type TaskSort,
} from "../../types/tasks";
import {
  categoryItems,
  taskPriorityItems,
  taskStatusItems,
  type Category,
  type Priority,
  type TaskStatus,
} from "../../lib/validations/task";
import { Button } from "../../components/ui/button";
import { Switch } from "../../components/ui/switch";
import { isExpiredTask } from "../../lib/task/expiredTask";
const categoryStatusItem = [
  { label: "全て", value: "ALL" },
  ...categoryItems,
] as const;
const statusItems = [
  { label: "全て", value: "ALL" },
  ...taskStatusItems,
] as const;
const priorityItems = [
  { label: "全て", value: "ALL" },
  ...taskPriorityItems,
] as const;

const TaskListPage = () => {
  const [title, setTitle] = useState("");
  const [expired, setExpired] = useState(false);
  const debouncedTitle = useDebounce(title, 500);
  const [searchParams, setSearchParams] = useState<TaskSearchParams>({
    title: "",
  });
  const {
    data: tasks,
    isPending,
    isError,
    error,
  } = useTasks({ ...searchParams, title: debouncedTitle });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCategorySelectChange = (value: Category | "ALL" | null) => {
    setSearchParams((prev) => ({
      ...prev,
      category: value === "ALL" || value === null ? undefined : value,
    }));
  };

  const handleStatusSelectChange = (value: TaskStatus | "ALL" | null) => {
    setSearchParams((prev) => ({
      ...prev,
      status: value === "ALL" || value === null ? undefined : value,
    }));
  };
  const handlePrioritySelectChange = (value: Priority | "ALL" | null) => {
    setSearchParams((prev) => ({
      ...prev,
      priority: value === "ALL" || value === null ? undefined : value,
    }));
  };
  const handleSortSelectChange = (value: TaskSort | null) => {
    setSearchParams((prev) => ({
      ...prev,
      sort: value === null ? undefined : value,
    }));
  };

  const handleResetSearchParams = () => {
    setTitle("");
    setSearchParams({
      title: "",
      category: undefined,
      status: undefined,
      priority: undefined,
    });
  };

  const filterExpiredTasks = () => {
    if (!expired) {
      return tasks?.filter((task) => !isExpiredTask(task));
    }
    return tasks;
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap gap-6 items-center">
        {isPending && <p>読み込み中...</p>}
        {isError && <p className="text-red-500">{error.message}</p>}
        {tasks?.length === 0 && <div>データなし</div>}
        <InputGroup className="max-w-xs">
          <InputGroupInput
            placeholder="タイトル検索..."
            onChange={handleInputChange}
            value={title}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            {tasks?.length} 件
          </InputGroupAddon>
        </InputGroup>

        <Label>カテゴリー</Label>
        <Select
          items={categoryStatusItem}
          onValueChange={handleCategorySelectChange}
          value={searchParams.category ?? categoryStatusItem[0].value}
        >
          <SelectTrigger className="w-full max-w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>カテゴリー</SelectLabel>
              {categoryStatusItem.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Label>ステータス</Label>
        <Select
          items={statusItems}
          onValueChange={handleStatusSelectChange}
          value={searchParams.status ?? statusItems[0].value}
        >
          <SelectTrigger className="w-full max-w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>ステータス</SelectLabel>
              {statusItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Label>優先度</Label>
        <Select
          items={priorityItems}
          onValueChange={handlePrioritySelectChange}
          value={searchParams.priority ?? priorityItems[0].value}
        >
          <SelectTrigger className="w-full max-w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>優先度</SelectLabel>
              {priorityItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex gap-2 items-center">
          <Label>期限切れ表示</Label>
          <Switch checked={expired} onCheckedChange={setExpired} />
        </div>
        <Label>ソート</Label>
        <Select
          items={taskSortItems}
          onValueChange={handleSortSelectChange}
          value={searchParams.sort ?? taskSortItems[0].value}
        >
          <SelectTrigger className="w-full max-w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>ソート</SelectLabel>
              {taskSortItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={handleResetSearchParams}>
          検索条件リセット
        </Button>
      </div>
      <div className="flex flex-wrap gap-4 mt-4">
        {filterExpiredTasks()?.length === 0 && <div>タスクがありません</div>}
        {filterExpiredTasks()?.map((task) => {
          return <TaskCard key={task.id} task={task} isEdit={true} />;
        })}
      </div>
    </div>
  );
};

export default TaskListPage;
