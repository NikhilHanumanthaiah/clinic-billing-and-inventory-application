
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';
import Button from '../components/Button';

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
            navigate('/medicines');
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
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Add Medicine</h2>
            <div className="bg-white shadow-md rounded-lg p-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                        <input type="text" {...register('name', { required: true })} className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                        {errors.name && <span className="text-danger text-sm mt-1">This field is required</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Price</label>
                        <input type="number" step="0.01" {...register('price_per_unit', { required: true })} className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                        {errors.price_per_unit && <span className="text-danger text-sm mt-1">This field is required</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Stock</label>
                        <input type="number" {...register('stock', { required: true })} className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                        {errors.stock && <span className="text-danger text-sm mt-1">This field is required</span>}
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit">Add Medicine</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddMedicine;
