import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  categoryItems,
  createTaskSchema,
  taskPriorityItems,
  taskStatusItems,
  type TaskInput,
} from "../../lib/validations/task";

type TaskFormProps = {
  title: string;
  initialValues?: TaskInput;
  onSubmit: (data: TaskInput) => Promise<void>;
  submitLabel: string;
  resetAfterSubmit?: boolean;
};

const TaskForm = ({
  title,
  initialValues,
  onSubmit,
  submitLabel,
  resetAfterSubmit = false,
}: TaskFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TaskInput>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: initialValues,
  });

  const handleValidSubmit = async (data: TaskInput) => {
    try {
      console.log(data);
      await onSubmit(data);
      if (resetAfterSubmit) reset();
    } catch {
      console.error("エラーが発生しました");
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <form
        onSubmit={handleSubmit(handleValidSubmit, (errors) => {
          console.log("バリデーションエラー", errors);
        })}
      >
        <CardHeader className="pb-4">
          <CardTitle>{title}</CardTitle>
          <CardDescription>タスクを作成しよう</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="title">タイトル</Label>
              <Input
                id="title"
                type="text"
                placeholder="タイトル"
                {...register("title")}
                aria-invalid={!!errors.title}
                aria-describedby={errors.title ? "title-error" : undefined}
              />
              {errors.title && (
                <p role="alert" className="text-red-500 text-xs">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">説明</Label>
              <Textarea
                id="description"
                {...register("description")}
                aria-invalid={!!errors.description}
                aria-describedby={
                  errors.description ? "description-error" : undefined
                }
              />
              {errors.description && (
                <p role="alert" className="text-red-500 text-xs">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Controller
                name="category"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <Label htmlFor="category">カテゴリー</Label>

                    <Select
                      name={field.name}
                      value={field.value ?? null}
                      onValueChange={field.onChange}
                      items={categoryItems}
                    >
                      <SelectTrigger
                        id="category"
                        aria-invalid={fieldState.invalid}
                        aria-describedby={
                          fieldState.error ? "category-error" : undefined
                        }
                      >
                        <SelectValue placeholder="カテゴリー" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          {categoryItems.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {fieldState.error && (
                      <p
                        id="category-error"
                        role="alert"
                        className="text-xs text-red-500"
                      >
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Controller
              name="priority"
              control={control}
              render={({ field, fieldState }) => (
                <div className="space-y-2">
                  <Label htmlFor="priority">優先度</Label>

                  <Select
                    name={field.name}
                    value={field.value ?? null}
                    onValueChange={field.onChange}
                    items={taskPriorityItems}
                  >
                    <SelectTrigger
                      id="priority"
                      aria-invalid={fieldState.invalid}
                      aria-describedby={
                        fieldState.error ? "priority-error" : undefined
                      }
                    >
                      <SelectValue placeholder="優先度" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {taskPriorityItems.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {fieldState.error && (
                    <p
                      id="category-error"
                      role="alert"
                      className="text-xs text-red-500"
                    >
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="grid gap-2">
            <Controller
              name="status"
              control={control}
              render={({ field, fieldState }) => (
                <div className="space-y-2">
                  <Label htmlFor="status">ステータス</Label>

                  <Select
                    name={field.name}
                    value={field.value ?? null}
                    onValueChange={field.onChange}
                    items={taskStatusItems}
                  >
                    <SelectTrigger
                      id="status"
                      aria-invalid={fieldState.invalid}
                      aria-describedby={
                        fieldState.error ? "status-error" : undefined
                      }
                    >
                      <SelectValue placeholder="ステータスを選択" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectGroup>
                        {taskStatusItems.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  {fieldState.error && (
                    <p role="alert" className="text-xs text-red-500">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
          <div className="grid gap-2 mb-4">
            <Label htmlFor="dueDate">期限</Label>
            <Input
              id="dueDate"
              type="date"
              {...register("dueDate")}
              aria-invalid={!!errors.dueDate}
              aria-describedby={errors.dueDate ? "dueDate-error" : undefined}
            />
            {errors.dueDate && (
              <p className="text-red-500 text-xs">{errors.dueDate.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
            onClick={() => console.log("押した")}
          >
            {submitLabel}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TaskForm;
