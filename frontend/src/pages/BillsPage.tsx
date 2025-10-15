
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import Table from '../components/Table';
import Button from '../components/Button';

const fetchBills = async () => {
    const response = await api.get('/bills');
    return response.data;
};

function BillsPage() {
    const { data: bills, isLoading, isError } = useQuery({
        queryKey: ['bills'],
        queryFn: fetchBills
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching bills</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">Bills</h2>
                    <p className="text-slate-600">Patient invoices and summaries</p>
                </div>
                <Link to="/create-bill"><Button variant="primary">+ Create Bill</Button></Link>
            </div>

            <div className="bg-white shadow-md rounded-lg">
                <Table>
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="text-left px-6 py-3 text-sm font-semibold text-slate-600 uppercase tracking-wider">Patient</th>
                            <th className="text-right px-6 py-3 text-sm font-semibold text-slate-600 uppercase tracking-wider">Age</th>
                            <th className="text-right px-6 py-3 text-sm font-semibold text-slate-600 uppercase tracking-wider">Total</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {bills.map((bill: any) => (
                            <tr key={bill.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 whitespace-nowrap">{bill.patient_name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">{bill.patient_age}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">₹{bill.bill_items.reduce((acc: number, item: any) => acc + item.price_per_unit * item.quantity, 0)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default BillsPage;
