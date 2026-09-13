import { FormEvent } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    image_path: string | null;
}

interface EditProductProps {
    product: Product;
}

export default function EditProduct({ product }: EditProductProps) {
    // Populate Inertia useForm engine with existing product database details
    const { data, setData, post, processing, errors } = useForm({
        name: product.name,
        price: product.price,
        category: product.category,
        image: null as File | null,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Sending a POST request to our update endpoint
        post(`/admin/products/${product.id}`);
    };

    return (
        <>
            <Head title={`Edit ${product.name} - Maroon Admin`} />
            
            <div style={{ backgroundColor: '#0b0204', minHeight: '100vh', padding: '40px 20px', color: '#fff', fontFamily: 'sans-serif' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#1e050a', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                    
                    <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '30px' }}>
                        <h1 style={{ color: '#5c0615', margin: 0, fontWeight: '900', fontSize: '1.8rem' }}>EDIT PRODUCT</h1>
                        <Link href="/shop" style={{ color: '#cca3a8', textDecoration: 'none', fontSize: '0.9rem' }}>← Back to Shop</Link>
                    </div>

                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        
                        {/* Product Name */}
                        <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '0.9rem', color: '#cca3a8' }}>Product Name</label>
                            <input 
                                type="text" 
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #5c0615', backgroundColor: '#0b0204', color: '#fff' }}
                                required
                            />
                            {errors.name && <span style={{ color: '#ff4d4d', fontSize: '0.85rem' }}>{errors.name}</span>}
                        </div>

                        {/* Product Price */}
                        <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '0.9rem', color: '#cca3a8' }}>Price ($)</label>
                            <input 
                                type="number" 
                                step="0.01"
                                value={data.price}
                                onChange={e => setData('price', parseFloat(e.target.value) || 0)}
                                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #5c0615', backgroundColor: '#0b0204', color: '#fff' }}
                                required
                            />
                            {errors.price && <span style={{ color: '#ff4d4d', fontSize: '0.85rem' }}>{errors.price}</span>}
                        </div>

                        {/* Category Selector */}
                        <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '0.9rem', color: '#cca3a8' }}>Category</label>
                            <input 
                                type="text" 
                                placeholder="e.g., clothes, accents"
                                value={data.category}
                                onChange={e => setData('category', e.target.value)}
                                style={{ padding: '12px', borderRadius: '8px', border: '1px solid #5c0615', backgroundColor: '#0b0204', color: '#fff' }}
                                required
                            />
                            <small style={{ color: '#888' }}>Use "accents" for accessories, anything else filters to clothes.</small>
                            {errors.category && <span style={{ color: '#ff4d4d', fontSize: '0.85rem' }}>{errors.category}</span>}
                        </div>

                        {/* Current Image Preview & Upload Element */}
                        <div style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '0.9rem', color: '#cca3a8' }}>Product Image</label>
                            
                            {product.image_path && (
                                <div style={{ marginBottom: '10px' }}>
                                    <span style={{ fontSize: '0.8rem', color: '#888', display: 'block', marginBottom: '5px' }}>Current image:</span>
                                    <img src={`/storage/${product.image_path}`} alt="Current preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #5c0615' }} />
                                </div>
                            )}

                            <input 
                                type="file" 
                                onChange={e => setData('image', e.target.files ? e.target.files[0] : null)}
                                style={{ color: '#cca3a8', fontSize: '0.9rem' }}
                            />
                            <small style={{ color: '#888' }}>Leave empty to keep current image asset.</small>
                            {errors.image && <span style={{ color: '#ff4d4d', fontSize: '0.85rem' }}>{errors.image}</span>}
                        </div>

                        {/* Update Execution Button */}
                        <button 
                            type="submit" 
                            disabled={processing}
                            style={{ width: '100%', padding: '14px', backgroundColor: '#5c0615', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}
                        >
                            {processing ? 'Saving Changes...' : 'Update Product'}
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
}