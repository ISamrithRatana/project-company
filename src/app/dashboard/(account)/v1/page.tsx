export default function DashboardPage() {
  return (
    <div>
        <div className="p-6 bg-gray-100 w-full min-h-screen space-y-6">
        <h1 className="text-2xl font-bold">📊 Sales Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="shadow-lg rounded-2xl"></div>
            <div className="shadow-lg rounded-2xl"></div>
            <div className="shadow-lg rounded-2xl"></div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="shadow-lg rounded-2xl"></div>
        <div className="shadow-lg rounded-2xl"></div>
        
        </div>

    </div>
  );
}
