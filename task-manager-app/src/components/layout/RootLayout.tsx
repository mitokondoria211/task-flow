import { Outlet } from "react-router-dom";

import { Toaster } from "../ui/sonner";
import Header from "../Header";

const RootLayout = () => {
  return (
    <div className="min-h-dvh">
      <Header />
      <main className="p-4">
        <Outlet />
      </main>
      <Toaster position="top-center" richColors />
    </div>
  );
};

export default RootLayout;
