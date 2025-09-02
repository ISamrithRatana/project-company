import ActionData from "@/components/Action-data";
import Sidebar from "@/components/Sidebar";
import { DialogProvider } from "@/components/DialogProvider/DialogSystemProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DialogProvider>
      <div className="flex flex-col h-screen overflow-hidden space-x-1">
        <ActionData />
      <div className="flex-1 flex border border-gray-300 rounded-lg">
        <Sidebar />
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
    </DialogProvider>
  );
}
