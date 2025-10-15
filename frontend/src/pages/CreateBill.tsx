
import { useForm, useFieldArray } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';
import Button from '../components/Button';

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
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Create Bill</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Patient Name</label>
                        <input type="text" {...register('patient_name', { required: true })} className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                        {errors.patient_name && <span className="text-danger text-sm mt-1">This field is required</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Patient Age</label>
                        <input type="number" {...register('patient_age', { required: true })} className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                        {errors.patient_age && <span className="text-danger text-sm mt-1">This field is required</span>}
                    </div>
                </div>

                <h3 className="text-xl font-semibold text-slate-800 border-b pb-2">Medicines</h3>
                <div className="space-y-4">
                    {fields.map((field, index) => (
                        <div key={field.id} className="grid grid-cols-12 gap-4 items-center">
                            <div className="col-span-5">
                                <select {...register(`items.${index}.medicine_id`, { required: true })} className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
                                    <option value="">Select Medicine</option>
                                    {medicines.map((medicine: any) => (
                                        <option key={medicine.id} value={medicine.id}>{medicine.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-span-2">
                                <input type="number" {...register(`items.${index}.quantity`, { required: true, min: 1 })} placeholder="Qty" className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                            </div>
                            <div className="col-span-3">
                                <input type="number" step="0.01" {...register(`items.${index}.price_per_unit`)} placeholder="Price" className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary" />
                            </div>
                            <div className="col-span-2">
                                <Button variant="danger" onClick={() => remove(index)}>Remove</Button>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <Button variant="success" type="button" onClick={() => append({ medicine_id: '', quantity: 1, price_per_unit: null })}>+ Add Medicine</Button>
                </div>

                <div className="flex justify-end items-center pt-4 border-t">
                    <span className="text-2xl font-bold text-slate-800">Total: ₹{getTotal()}</span>
                </div>

                <div className="flex justify-end">
                    <Button type="submit">Create Bill</Button>
                </div>
            </form>
        </div>
    );
}

export default CreateBill;
