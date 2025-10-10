
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';

const addMedicine = async (data: any) => {
    await api.post('/medicines', data);
};

function AddMedicine() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const mutation = useMutation({
        mutationFn: addMedicine,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['medicines'] });
            toast.success('Medicine added successfully');
            navigate('/');
        },
        onError: () => {
            toast.error('Failed to add medicine');
        },
    });

    const onSubmit = (data: any) => {
        mutation.mutate(data);
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Add Medicine</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input type="text" {...register('name', { required: true })} className="w-full px-3 py-2 border rounded" />
                    {errors.name && <span className="text-red-500">This field is required</span>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Price</label>
                    <input type="number" step="0.01" {...register('price_per_unit', { required: true })} className="w-full px-3 py-2 border rounded" />
                    {errors.price_per_unit && <span className="text-red-500">This field is required</span>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Stock</label>
                    <input type="number" {...register('stock', { required: true })} className="w-full px-3 py-2 border rounded" />
                    {errors.stock && <span className="text-red-500">This field is required</span>}
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Medicine</button>
            </form>
        </div>
    );
}

export default AddMedicine;
