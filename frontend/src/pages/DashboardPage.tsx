export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-4">Welcome, Doctor!</h1>
      <p className="text-lg text-slate-600 mb-8">Here is a summary of your clinic's activity.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-slate-700 mb-2">Recent Bills</h2>
          <p className="text-4xl font-bold text-primary">12</p>
          <p className="text-sm text-slate-500">in the last 24 hours</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-slate-700 mb-2">Medicine Inventory</h2>
          <p className="text-4xl font-bold text-accent">5</p>
          <p className="text-sm text-slate-500">medicines are low in stock</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-slate-700 mb-2">Total Revenue</h2>
          <p className="text-4xl font-bold text-green-500">$1,250</p>
          <p className="text-sm text-slate-500">today</p>
        </div>
      </div>
    </div>
  );
}
