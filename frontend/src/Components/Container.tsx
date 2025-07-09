// Container.tsx
import Sidebar from "./Sidebar";
import { useSidebarStore } from "../Store/useSideBarStore";
import Navbar from "./Navbar";

export default function Container({ children }: { children: React.ReactNode }) {
  const collapsed = useSidebarStore((state) => state.collapsed);

  return (
    <div className="flex min-h-screen">
      <Navbar />
      <Sidebar />
      <main className={`flex-1 min-h-screen transition-all duration-300 ${collapsed ? "ml-16" : "ml-64"} p-6`}>
        <section className="mb-6 pt-16 ">
            {children}
        </section>
      </main>
    </div>
  );
}
