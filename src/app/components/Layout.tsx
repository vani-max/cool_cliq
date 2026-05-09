import { Outlet } from "react-router";

export function Layout() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 overflow-hidden">
      {/* Mobile constraint container for "industry standard" feeling */}
      <div className="relative h-full w-full max-w-[480px] bg-white shadow-2xl overflow-y-auto overflow-x-hidden flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}
