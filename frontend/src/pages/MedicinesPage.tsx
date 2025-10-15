
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';
import Table from '../components/Table';
import Button from '../components/Button';

const fetchMedicines = async () => {
    const response = await api.get('/medicines');
    return response.data;
};

const deleteMedicine = async (id: number) => {
    await api.delete(`/medicines/${id}`);
};

function MedicinesPage() {
    const queryClient = useQueryClient();
    const { data: medicines, isLoading, isError } = useQuery({
        queryKey: ['medicines'],
        queryFn: fetchMedicines
    });

    const deleteMutation = useMutation({
        mutationFn: deleteMedicine,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['medicines'] });
            toast.success('Medicine deleted successfully');
        },
        onError: () => {
            toast.error('Failed to delete medicine');
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching medicines</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">Medicines</h2>
                    <p className="text-slate-600">Manage stock and pricing for medicines</p>
                </div>
                <Link to="/add-medicine"><Button>+ Add Medicine</Button></Link>
            </div>

            <div className="bg-white shadow-md rounded-lg">
                <Table>
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="text-left px-6 py-3 text-sm font-semibold text-slate-600 uppercase tracking-wider">Name</th>
                            <th className="text-right px-6 py-3 text-sm font-semibold text-slate-600 uppercase tracking-wider">Price</th>
                            <th className="text-right px-6 py-3 text-sm font-semibold text-slate-600 uppercase tracking-wider">Stock</th>
                            <th className="text-center px-6 py-3 text-sm font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {medicines.map((medicine: any) => (
                            <tr key={medicine.id} className="hover:bg-slate-50">
                                <td className="px-6 py-4 whitespace-nowrap">{medicine.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">₹{medicine.price_per_unit}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right">{medicine.stock}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                    <Link to={`/edit-medicine/${medicine.id}`}><Button variant="secondary" className="mr-2">Edit</Button></Link>
                                    <Button variant="danger" onClick={() => deleteMutation.mutate(medicine.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default MedicinesPage;
