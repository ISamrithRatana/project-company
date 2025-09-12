import Navigation from "@/components/SystemNavigation";
import Sidebar from "@/components/side-bar";
import { DialogProvider } from "@/components/dialog-provider/DialogSystemProvider";

interface LayoutProps {
  children: React.ReactNode;
  activeTbl?: string;
}

export default function Layout({ children, activeTbl }: LayoutProps) {
  return (
    <DialogProvider>
      <div className="flex flex-col h-screen bg-gray-50">
        <Navigation />
        <div className="flex flex-1 overflow-hidden m-2 border border-gray-200 rounded-lg shadow-sm">
          <aside className="w-64 border-r border-gray-200 bg-white overflow-y-auto p-2">
            <Sidebar activeTbl={activeTbl} />
          </aside>
          <main className="flex-1 overflow-y-auto p-4">{children}</main>
        </div>
      </div>
    </DialogProvider>
  );
}
