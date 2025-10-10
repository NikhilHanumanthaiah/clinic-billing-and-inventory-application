
import { useForm, useFieldArray } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';

const fetchMedicines = async () => {
    const response = await api.get('/medicines');
    return response.data;
};

const createBill = async (data: any) => {
    await api.post('/bills', data);
};

function CreateBill() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { register, handleSubmit, control, watch, formState: { errors } } = useForm();
    const { fields, append, remove } = useFieldArray({ control, name: 'items' });

    const { data: medicines, isLoading, isError } = useQuery({
        queryKey: ['medicines'],
        queryFn: fetchMedicines
    });

    const mutation = useMutation({
        mutationFn: createBill,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bills'] });
            queryClient.invalidateQueries({ queryKey: ['medicines'] });
            toast.success('Bill created successfully');
            navigate('/bills');
        },
        onError: (error: any) => {
            toast.error(error.response.data.detail || 'Failed to create bill');
        },
    });

    const onSubmit = (data: any) => {
        mutation.mutate(data);
    };

    const watchItems = watch('items');

    const getTotal = () => {
        let total = 0;
        watchItems?.forEach((item: any) => {
            const medicine = medicines?.find((m: any) => m.id === parseInt(item.medicine_id));
            if (medicine) {
                total += (item.price_per_unit || medicine.price_per_unit) * item.quantity;
            }
        });
        return total;
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching medicines</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Create Bill</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-gray-700">Patient Name</label>
                    <input type="text" {...register('patient_name', { required: true })} className="w-full px-3 py-2 border rounded" />
                    {errors.patient_name && <span className="text-red-500">This field is required</span>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Patient Age</label>
                    <input type="number" {...register('patient_age', { required: true })} className="w-full px-3 py-2 border rounded" />
                    {errors.patient_age && <span className="text-red-500">This field is required</span>}
                </div>

                <h3 className="text-xl font-bold mb-2">Medicines</h3>
                {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center mb-2">
                        <select {...register(`items.${index}.medicine_id`, { required: true })} className="w-1/2 px-3 py-2 border rounded mr-2">
                            <option value="">Select Medicine</option>
                            {medicines.map((medicine: any) => (
                                <option key={medicine.id} value={medicine.id}>{medicine.name}</option>
                            ))}
                        </select>
                        <input type="number" {...register(`items.${index}.quantity`, { required: true, min: 1 })} placeholder="Quantity" className="w-1/4 px-3 py-2 border rounded mr-2" />
                        <input type="number" step="0.01" {...register(`items.${index}.price_per_unit`)} placeholder="Custom Price" className="w-1/4 px-3 py-2 border rounded mr-2" />
                        <button type="button" onClick={() => remove(index)} className="bg-red-500 text-white px-2 py-1 rounded">Remove</button>
                    </div>
                ))}
                <button type="button" onClick={() => append({ medicine_id: '', quantity: 1, price_per_unit: null })} className="bg-green-500 text-white px-4 py-2 rounded mb-4">Add Medicine</button>

                <div className="text-2xl font-bold">Total: {getTotal()}</div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Create Bill</button>
            </form>
        </div>
    );
}

export default CreateBill;
