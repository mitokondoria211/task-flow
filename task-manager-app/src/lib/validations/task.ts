import { z } from "zod";

const categoryValues = [
  "front_end",
  "back_end",
  "infra",
  "testing",
  "document",
  "review",
  "design",
  "meeting",
] as const;

export const categorySchema = z.enum(categoryValues);

export type Category = z.infer<typeof categorySchema>;

export const categoryLabels: Record<Category, string> = {
  front_end: "フロントエンド",
  back_end: "バックエンド",
  infra: "インフラ",
  testing: "テスト",
  document: "ドキュメント",
  review: "レビュー",
  design: "設計",
  meeting: "会議",
};

export const categoryItems = categoryValues.map((value) => ({
  value,
  label: categoryLabels[value],
}));

export const priorityValues = ["HIGH", "MIDDLE", "LOW", "NONE"] as const;

export const priorityShema = z.enum(priorityValues);

export type Priority = z.infer<typeof priorityShema>;

export const priorityLabels: Record<Priority, string> = {
  HIGH: "高",
  MIDDLE: "中",
  LOW: "低",
  NONE: "なし",
};

export const taskPriorityItems = priorityValues.map((value) => ({
  value,
  label: priorityLabels[value],
}));
export const taskStatusValues = [
  "INITIATION",
  "IN_PROGRESS",
  "PENDING",
  "CANCELED",
  "COMPLETED",
] as const;

export const taskStatusShema = z.enum(taskStatusValues);

export type TaskStatus = z.infer<typeof taskStatusShema>;

export const taskStatusLabels: Record<TaskStatus, string> = {
  INITIATION: "未着手",
  IN_PROGRESS: "進行中",
  PENDING: "保留",
  CANCELED: "キャンセル",
  COMPLETED: "完了",
};

export const taskStatusItems = taskStatusValues.map((value) => ({
  value,
  label: taskStatusLabels[value],
}));

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, "タイトルを入力してください")
    .max(50, "タイトルは1~50文字以内で入力してください"),
  description: z.string().max(200, "説明は200文字以内にしてください"),
  category: categorySchema,
  priority: priorityShema,
  status: taskStatusShema,
  dueDate: z.iso.date(),
});

export type TaskInput = z.infer<typeof createTaskSchema>;

export const patchTaskSchema = createTaskSchema.partial();

export type PatchTaskInput = z.infer<typeof patchTaskSchema>;
