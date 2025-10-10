
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import api from '../api/axios';

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
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Bills</h2>
                <Link to="/create-bill" className="bg-blue-500 text-white px-4 py-2 rounded">Create Bill</Link>
            </div>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Patient Name</th>
                        <th className="px-4 py-2">Patient Age</th>
                        <th className="px-4 py-2">Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {bills.map((bill: any) => (
                        <tr key={bill.id}>
                            <td className="border px-4 py-2">{bill.patient_name}</td>
                            <td className="border px-4 py-2">{bill.patient_age}</td>
                            <td className="border px-4 py-2">
                                {bill.bill_items.reduce((acc: number, item: any) => acc + item.price_per_unit * item.quantity, 0)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BillsPage;
