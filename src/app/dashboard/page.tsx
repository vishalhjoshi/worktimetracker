export const metadata = {
  title: "Dashboard | Work Time Tracker",
  description: "View your work sessions and analytics.",
};

import DashboardClient from "@/app/dashboard/DashboardClient";

export default function Page() {
  return <DashboardClient />;
}
