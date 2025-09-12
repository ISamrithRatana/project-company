import StatsCards from "@/components/dashboard-components/stats-cards";
import DataTable from "@/components/dashboard-components/line-table";
import ActivityFeed from "@/components/dashboard-components/activity-feed";
import Notifications from "@/components/dashboard-components/notifications";
import SettingsPanel from "@/components/dashboard-components/settings-panel";
import GrayChartSVG from "@/components/dashboard-components/gray-chart";
import LineChartSVG from "@/components/dashboard-components/line-data";
import DashboardLayout from "@/components/dashboard-components/dashboard-layout";

const weeklyData = [
  { name: "Mon", value: 30 },
  { name: "Tue", value: 50 },
  { name: "Wed", value: 45 },
  { name: "Thu", value: 70 },
  { name: "Fri", value: 55 },
  { name: "Sat", value: 40 },
  { name: "Sun", value: 65 },
];

export default function DashboardPage() {
  return (
        <DashboardLayout>
          <StatsCards />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
            <GrayChartSVG data={weeklyData} />
            <LineChartSVG data={weeklyData} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <DataTable />
            <ActivityFeed />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Notifications />
            <SettingsPanel />
          </div>
      </DashboardLayout>
  );
}
