import React from 'react';
import { Head, useForm } from '@inertiajs/react';

export default function CreateProduct() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        price: '',
        stock_quantity: '',
        category: 'clothes',
        image: null as File | null, // Track file state
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Inertia handles file uploads seamlessly over POST requests
        post('/admin/products', {
            onSuccess: () => {
                reset();
                alert('Product with image added to Maroon successfully!');
            }
        });
    };

    return (
        <>
            <Head title="Admin - Add Product" />
            <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
                <h1 style={{ color: '#800000' }}>Add New Maroon Product</h1>
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <label style={{ display: 'block', fontWeight: 'bold' }}>Product Name</label>
                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} style={{ width: '100%', padding: '8px' }} />
                        {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                    </div>

                    <div>
                        <label style={{ display: 'block', fontWeight: 'bold' }}>Description</label>
                        <textarea value={data.description} onChange={e => setData('description', e.target.value)} style={{ width: '100%', padding: '8px' }} />
                        {errors.description && <span style={{ color: 'red' }}>{errors.description}</span>}
                    </div>

                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontWeight: 'bold' }}>Price ($)</label>
                            <input type="number" step="0.01" value={data.price} onChange={e => setData('price', e.target.value)} style={{ width: '100%', padding: '8px' }} />
                            {errors.price && <span style={{ color: 'red' }}>{errors.price}</span>}
                        </div>

                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontWeight: 'bold' }}>Stock Quantity</label>
                            <input type="number" value={data.stock_quantity} onChange={e => setData('stock_quantity', e.target.value)} style={{ width: '100%', padding: '8px' }} />
                            {errors.stock_quantity && <span style={{ color: 'red' }}>{errors.stock_quantity}</span>}
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontWeight: 'bold' }}>Category</label>
                        <select value={data.category} onChange={e => setData('category', e.target.value)} style={{ width: '100%', padding: '8px' }}>
                            <option value="clothes">Clothes</option>
                            <option value="accents">Accents</option>
                        </select>
                        {errors.category && <span style={{ color: 'red' }}>{errors.category}</span>}
                    </div>

                    {/* NEW: Image Upload Input */}
                    <div>
                        <label style={{ display: 'block', fontWeight: 'bold' }}>Product Image</label>
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={e => setData('image', e.target.files ? e.target.files[0] : null)} 
                            style={{ width: '100%', padding: '8px' }} 
                        />
                        {errors.image && <span style={{ color: 'red' }}>{errors.image}</span>}
                    </div>

                    <button type="submit" disabled={processing} style={{ backgroundColor: '#800000', color: 'white', padding: '10px', border: 'none', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>
                        {processing ? 'Uploading...' : 'Add Product'}
                    </button>
                </form>
            </div>
        </>
    );
}