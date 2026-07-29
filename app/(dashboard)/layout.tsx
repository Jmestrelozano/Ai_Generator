import Navbar from "@/features/dashboard/components/navbar";
import { Sidebar } from "@/features/dashboard/components/sidebar";
import { DashboardUsageProvider } from "@/features/dashboard/hooks/useDashboardUsage";

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <DashboardUsageProvider>
      <div className="h-full relative">
        <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900">
          <Sidebar />
        </div>
        <main className="md:pl-72 pb-10">
          <Navbar />
          {children}
        </main>
      </div>
    </DashboardUsageProvider>
  );
};

export default DashboardLayout;
