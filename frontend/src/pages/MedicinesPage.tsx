
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';

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
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Medicines</h2>
                <Link to="/add-medicine" className="bg-blue-500 text-white px-4 py-2 rounded">Add Medicine</Link>
            </div>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Stock</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {medicines.map((medicine: any) => (
                        <tr key={medicine.id}>
                            <td className="border px-4 py-2">{medicine.name}</td>
                            <td className="border px-4 py-2">{medicine.price_per_unit}</td>
                            <td className="border px-4 py-2">{medicine.stock}</td>
                            <td className="border px-4 py-2">
                                <Link to={`/edit-medicine/${medicine.id}`} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</Link>
                                <button onClick={() => deleteMutation.mutate(medicine.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MedicinesPage;
