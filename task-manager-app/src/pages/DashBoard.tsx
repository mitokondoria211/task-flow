import { useState } from "react";
import TaskCard from "../components/tasks/TaskCard";
import { useTasks, useTasksByPriority } from "../features/task/hooks/useTask";
import { taskStatistics } from "../lib/task/aggregateTask";
import { Switch } from "../components/ui/switch";

import { Label } from "../components/ui/label";

const DashBoard = () => {
  const [completed, setCompleted] = useState(false);
  const [expired, setExpired] = useState(false);
  const { data: tasks } = useTasks({});
  const { data: highTasks } = useTasksByPriority("HIGH", completed, expired);
  const { data: middleTasks } = useTasksByPriority(
    "MIDDLE",
    completed,
    expired,
  );
  const { data: lowTasks } = useTasksByPriority("LOW", completed, expired);
  if (!tasks) return <div>データの取得に失敗しました。</div>;
  const aggreateTaskFunc = taskStatistics(tasks);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div>全タスク:{aggreateTaskFunc.allTasksSize}</div>
          <div>未完了:{aggreateTaskFunc.unCompletedTasksSize}</div>
          <div>完了:{aggreateTaskFunc.completedTasksSize}</div>
          <div>期限切れ:{aggreateTaskFunc.expiredTasksSize}</div>
        </div>
        <div className="flex gap-2">
          <div className="flex gap-2 items-center">
            <Label>完了表示</Label>
            <Switch checked={completed} onCheckedChange={setCompleted} />
          </div>
          <div className="flex gap-2 items-center">
            <Label>期限切れ表示</Label>
            <Switch checked={expired} onCheckedChange={setExpired} />
          </div>
        </div>
      </div>

      <div className="grid border grid-cols-3 gap-4">
        <section className="flex flex-col gap-2 border">
          <h2 className="flex flex-col text-center bg-red-400 text-white rounded-2xl py-1">
            高:{highTasks?.length}
          </h2>
          <div className="flex flex-col bg-red-200 p-4 items-center">
            {highTasks?.map((task) => (
              <TaskCard task={task} isEdit={false} isClick={false} />
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-2 border">
          <h2 className="text-center bg-yellow-300 p-4 text-white rounded-2xl py-1">
            中:{middleTasks?.length}
          </h2>
          <div className="flex flex-col items-center bg-yellow-200 p-4">
            {middleTasks?.map((task) => (
              <TaskCard task={task} isEdit={false} isClick={false} />
            ))}
          </div>
        </section>
        <section className="flex flex-col gap-2 border">
          <h2 className="text-center bg-green-300 text-white rounded-2xl py-1">
            低:{lowTasks?.length}
          </h2>
          <div className="flex flex-col bg-green-200 p-4 items-center">
            {lowTasks?.map((task) => (
              <TaskCard task={task} isEdit={false} isClick={false} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashBoard;
