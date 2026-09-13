import { Head, Link, useForm } from '@inertiajs/react';

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    image_path: string | null;
}

interface DashboardProps {
    products: Product[];
}

export default function Dashboard({ products }: DashboardProps) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you absolutely sure you want to remove this item from your inventory?')) {
            destroy(`/admin/products/${id}`);
        }
    };

    return (
        <>
            <Head title="Admin Inventory Dashboard - Maroon" />

            <div style={{ backgroundColor: '#0b0204', minHeight: '100vh', padding: '40px 20px', color: '#fff', fontFamily: 'sans-serif' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    
                    {/* Upper Action Bar */}
                    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '2px solid #5c0615', paddingBottom: '20px' }}>
                        <div>
                            <h1 style={{ margin: 0, fontWeight: '900', fontSize: '2.2rem', color: '#fff', letterSpacing: '1px' }}>
                                MAROON <span style={{ color: '#5c0615', fontWeight: '300' }}>CONTROL DECK</span>
                            </h1>
                            <p style={{ margin: '5px 0 0 0', color: '#cca3a8', fontSize: '0.9rem' }}>Manage your apparel showcases and accent collections.</p>
                        </div>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <Link href="/" style={{ color: '#fff', textDecoration: 'none', padding: '10px 20px', borderRadius: '6px', border: '1px solid #5c0615', fontSize: '0.9rem', fontWeight: 'bold' }}>View Store</Link>
                            {/* Assuming you have a route to add products, replace URL if different */}
                            <Link href="/admin/products/create" style={{ backgroundColor: '#5c0615', color: '#fff', textDecoration: 'none', padding: '10px 20px', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(92, 6, 21, 0.4)' }}>+ Add New Product</Link>
                        </div>
                    </header>

                    {/* Inventory Table Card */}
                    <div style={{ backgroundColor: '#1e050a', borderRadius: '15px', padding: '25px', boxShadow: '0 15px 40px rgba(0,0,0,0.5)', overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #5c0615', color: '#cca3a8', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    <th style={{ padding: '15px 10px' }}>Image</th>
                                    <th style={{ padding: '15px 10px' }}>Product Name</th>
                                    <th style={{ padding: '15px 10px' }}>Category</th>
                                    <th style={{ padding: '15px 10px' }}>Price</th>
                                    <th style={{ padding: '15px 10px', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: '#cca3a8', fontSize: '0.95rem' }}>
                                            Your database inventory is empty. Click "+ Add New Product" to populate your catalog.
                                        </td>
                                    </tr>
                                ) : (
                                    products.map((product) => (
                                        <tr key={product.id} style={{ borderBottom: '1px solid #331017', transition: 'background 0.2s' }}>
                                            {/* Preview Thumbnail */}
                                            <td style={{ padding: '15px 10px' }}>
                                                {product.image_path ? (
                                                    <img src={`/storage/${product.image_path}`} alt="" style={{ width: '55px', height: '55px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #5c0615' }} />
                                                ) : (
                                                    <div style={{ width: '55px', height: '55px', backgroundColor: '#0b0204', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#666' }}>N/A</div>
                                                )}
                                            </td>

                                            {/* Info Fields */}
                                            <td style={{ padding: '15px 10px', fontWeight: 'bold', fontSize: '1.05rem' }}>{product.name}</td>
                                            <td style={{ padding: '15px 10px' }}>
                                                <span style={{ backgroundColor: product.category === 'accents' ? '#5c0615' : '#0b0204', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', border: '1px solid #5c0615' }}>
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td style={{ padding: '15px 10px', color: '#cca3a8', fontWeight: 'bold' }}>${Number(product.price).toFixed(2)}</td>

                                            {/* Operation Switches */}
                                            <td style={{ padding: '15px 10px', textAlign: 'right' }}>
                                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                                    <Link 
                                                        href={`/admin/products/${product.id}/edit`}
                                                        style={{ textDecoration: 'none', backgroundColor: '#fff', color: '#1e050a', padding: '6px 14px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold' }}
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleDelete(product.id)}
                                                        style={{ border: 'none', backgroundColor: '#e53e3e', color: '#fff', padding: '6px 14px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer' }}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}