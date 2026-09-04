import RootLayout from "../components/layout/RootLayout";
import DashBoard from "../pages/DashBoard";
import NotFound from "../pages/NotFound";
import TaskListPage from "../pages/tasks/TaskListPage";
import TaskDetailPage from "../pages/tasks/TaskDetailPage";
import TaskUpdatePage from "../pages/tasks/TaskUpdatePage";
import TaskCreatePage from "../pages/tasks/TaskCreatePage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <DashBoard />,
      },
      {
        path: "/tasks",
        element: <TaskListPage />,
      },
      {
        path: "/tasks/new",
        element: <TaskCreatePage />,
      },
      {
        path: "/tasks/:taskId",
        element: <TaskDetailPage />,
      },
      {
        path: "/tasks/:taskId/edit",
        element: <TaskUpdatePage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
