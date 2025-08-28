import type { Metadata } from "next";
import Bar from '@/components/Sidebar'
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
    return (<>
    <div className="flex min-h-screen">
        <Bar/>
        {children}
    </div>
    </>);
}
    