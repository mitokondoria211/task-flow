import RootLayout from "../components/layout/RootLayout";
import HomePage from "../pages/HomePage";
import DashBoard from "../pages/DashBoard";
import NotFound from "../pages/NotFound";
import TaskListPage from "../pages/tasks/TaskListPage";
import TaskDetailPage from "../pages/tasks/TaskDetailPage";
import TaskUpdatePage from "../pages/tasks/TaskUpdatePage";
import TaskCreatePage from "../pages/tasks/TaskCreatePage";
import { createBrowserRouter } from "react-router-dom";

// /records
// /records/new
// /records/:recordId
// /records/:recordId/edit
// /dashboard
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/dashboard",
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
