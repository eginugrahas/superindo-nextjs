"use client";

import Header from "../components/Header";
import Sidebar from "../components/SideBar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-p-white">
      <Header />
      <div className="flex flex-1">
        <div className="w-64 bg-gray-200">
          <Sidebar user={{ name: "JohnSmith", roles: "Operator" }} />
        </div>
        <div className="flex-1 overflow-hidden">
          <main className="h-full overflow-y-auto bg-gray-100 p-4">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
