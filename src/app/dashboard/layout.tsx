import type { Metadata } from "next";
import Sidebar from '@/components/SidebarComponets/DashboardSidebar'
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "World Peas",
    description: "A sustainable produce marketplace",
};

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
    <div className="flex min-h-screen">
        <Sidebar />
        {children}
    </div>
    );
}
    