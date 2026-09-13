import { Head, Link, useForm } from '@inertiajs/react';
import '../../css/shop.css';

interface CartItem {
    id: number;
    size: string;
    quantity: number;
    product: {
        name: string;
        price: number;
        image_path: string | null;
    };
}

interface BagProps {
    cartItems: CartItem[];
}

export default function ShoppingBag({ cartItems }: BagProps) {
    const { delete: destroy } = useForm();
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    const handleRemoveItem = (id: number) => {
        if (confirm('Remove this item from your bag?')) {
            destroy(`/cart/${id}`);
        }
    };

    return (
        <>
            <Head title="Your Bag - Maroon" />
            <div className="shop-container" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #2b030a 0%, #0b0204 100%)', color: '#fff', paddingBottom: '60px' }}>
                
                <header className="shop-header">
                    <div className="shop-logo">MAROON</div>
                    <nav className="shop-nav">
                        <Link href="/">Home</Link>
                        <Link href="/shop">Shop</Link>
                        <Link href="/accents">Accents</Link>
                    </nav>
                </header>

                <main style={{ maxWidth: '650px', margin: '50px auto 0 auto', padding: '0 20px' }}>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: '900', borderBottom: '2px solid #5c0615', paddingBottom: '15px', marginBottom: '30px' }}>YOUR SHOPPING BAG</h2>

                    {cartItems.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px' }}>
                            <p style={{ color: '#cca3a8', marginBottom: '20px' }}>Your shopping bag is empty.</p>
                            <Link href="/shop" style={{ color: '#fff', backgroundColor: '#5c0615', padding: '10px 20px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>Continue Shopping</Link>
                        </div>
                    ) : (
                        <>
                            {cartItems.map((item) => (
                                <div key={item.id} style={{ display: 'flex', gap: '20px', alignItems: 'center', backgroundColor: '#1e050a', padding: '15px', borderRadius: '12px', marginBottom: '15px', border: '1px solid #331017', position: 'relative' }}>
                                    
                                    {/* Product Image Asset */}
                                    {item.product.image_path ? (
                                        <img src={`/storage/${item.product.image_path}`} alt="" style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px' }} />
                                    ) : (
                                        <div style={{ width: '70px', height: '70px', backgroundColor: '#0b0204', borderRadius: '8px' }} />
                                    )}
                                    
                                    {/* Text Metadata Details */}
                                    <div style={{ flex: 1, paddingRight: '20px' }}>
                                        <h3 style={{ margin: 0, fontSize: '1.1rem', textTransform: 'capitalize' }}>{item.product.name}</h3>
                                        <p style={{ margin: '5px 0 0 0', color: '#cca3a8', fontSize: '0.9rem' }}>Qty: {item.quantity} {item.size !== 'N/A' && `| Size: ${item.size}`}</p>
                                    </div>
                                    
                                    {/* Row Item Total Price */}
                                    <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginRight: '15px' }}>
                                        ${(item.product.price * item.quantity).toFixed(2)}
                                    </div>

                                    {/* Interactive Remove Trigger Button */}
                                    <button 
                                        onClick={() => handleRemoveItem(item.id)}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: '#cca3a8',
                                            fontSize: '1.3rem',
                                            cursor: 'pointer',
                                            padding: '0 5px',
                                            lineHeight: '1',
                                            transition: 'color 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = '#ff4d4d'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = '#cca3a8'}
                                        title="Remove item"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #5c0615', paddingTop: '20px', marginTop: '30px', marginBottom: '30px' }}>
                                <span style={{ color: '#cca3a8', fontWeight: 'bold' }}>SUM TOTAL AMOUNT:</span>
                                <span style={{ fontSize: '1.8rem', fontWeight: '900' }}>${totalAmount.toFixed(2)}</span>
                            </div>

                            <div style={{ display: 'flex', gap: '15px' }}>
                                <Link href="/shop" style={{ flex: 1, padding: '16px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.2)', color: '#cca3a8', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Cancel</Link>
                                <button onClick={() => alert('Proceeding to Checkout!')} style={{ flex: 1, padding: '16px', backgroundColor: '#5c0615', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>Buy Now</button>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </>
    );
}