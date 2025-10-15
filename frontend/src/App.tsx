import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import MedicinesPage from './pages/MedicinesPage';
import AddMedicine from './pages/AddMedicine';
import BillsPage from './pages/BillsPage';
import CreateBill from './pages/CreateBill';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/medicines" element={<MedicinesPage />} />
            <Route path="/add-medicine" element={<AddMedicine />} />
            <Route path="/bills" element={<BillsPage />} />
            <Route path="/create-bill" element={<CreateBill />} />
          </Routes>
        </Layout>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
