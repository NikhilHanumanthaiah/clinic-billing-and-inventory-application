import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import MedicinesPage from './pages/MedicinesPage';
import AddMedicine from './pages/AddMedicine';
import BillsPage from './pages/BillsPage';
import CreateBill from './pages/CreateBill';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold my-4">Clinic Management</h1>

          {/* ✅ Add navigation here */}
          <nav className="flex gap-6 mb-6 border-b pb-3">
            <Link to="/" className="text-blue-600 hover:underline">Medicines</Link>
            <Link to="/bills" className="text-blue-600 hover:underline">Bills</Link>
            <Link to="/add-medicine" className="text-blue-600 hover:underline">Add Medicine</Link>
            <Link to="/create-bill" className="text-blue-600 hover:underline">Create Bill</Link>
          </nav>

          <Routes>
            <Route path="/" element={<MedicinesPage />} />
            <Route path="/add-medicine" element={<AddMedicine />} />
            <Route path="/bills" element={<BillsPage />} />
            <Route path="/create-bill" element={<CreateBill />} />
          </Routes>
        </div>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
