
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 overflow-auto bg-gradient-to-br from-background via-background to-accent/5">
            <div className="container py-1 sm:py-1 px-1 sm:px-1">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
