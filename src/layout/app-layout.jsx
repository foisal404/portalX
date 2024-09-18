import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 mt-10 bg-gray-800 text-center">
        Made by JCO foisal{" "}
      </div>
    </div>
  );
}

export default AppLayout;
