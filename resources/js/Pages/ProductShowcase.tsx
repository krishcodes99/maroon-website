import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import '../../css/shop.css'; // Syncs header layout rules

interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    image_path: string | null;
    description?: string;
}

interface ShowcaseProps {
    product: Product;
}

export default function ProductShowcase({ product }: ShowcaseProps) {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('M');
    
    // 1. Initialize useForm with the initial state fields so TypeScript registers the types
    const { setData, post, processing } = useForm({
        product_id: product.id,
        size: product.category !== 'accents' ? 'M' : 'N/A',
        quantity: 1
    });

    const handleAddToCart = () => {
        // Determine the correct size configuration
        const correctSize = product.category !== 'accents' ? selectedSize : 'N/A';

        // 2. Pass the final data payload into a callback structure via setData, then execute post
        setData(prev => ({
            ...prev,
            size: correctSize,
            quantity: quantity
        }));

        post('/cart/add');
    };

    return (
        <>
            <Head title={`${product.name} - Maroon`} />

            {/* Using a linear gradient matching your signature deep maroon home background */}
            <div className="shop-container" style={{ 
                minHeight: '100vh', 
                background: 'linear-gradient(135deg, #2b030a 0%, #0b0204 100%)',
                paddingBottom: '60px'
            }}>
                
                {/* Header Layout */}
                <header className="shop-header">
                    <div className="shop-logo">MAROON</div>
                    <nav className="shop-nav">
                        <Link href="/">Home</Link>
                        <Link href="/shop" className={product.category !== 'accents' ? 'active' : ''}>Shop</Link>
                        <Link href="/accents" className={product.category === 'accents' ? 'active' : ''}>Accents</Link>
                        <Link href="/contact">Contact</Link>
                    </nav>
                </header>

                {/* Main Content Split Frame */}
                <main style={{ 
                    maxWidth: '1000px', 
                    margin: '60px auto 0 auto', 
                    padding: '0 20px', 
                    display: 'grid', 
                    gridTemplateColumns: '420px 1fr', 
                    gap: '60px', 
                    alignItems: 'center' 
                }}>
                    
                    {/* Left Frame: Premium Rectangular Card Container */}
                    <div style={{ 
                        position: 'relative',
                        width: '100%',
                        height: '520px', 
                        borderRadius: '16px', 
                        overflow: 'hidden', 
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
                        backgroundColor: '#140306'
                    }}>
                        {product.image_path ? (
                            <img 
                                src={`/storage/${product.image_path}`} 
                                alt={product.name} 
                                style={{ 
                                    width: '100%', 
                                    height: '100%', 
                                    objectFit: 'cover', 
                                    display: 'block'
                                }}
                            />
                        ) : (
                            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cca3a8' }}>
                                <span>No Image Available</span>
                            </div>
                        )}
                    </div>

                    {/* Right Frame: Vertical Typography Flow & Form Control */}
                    <div style={{ display: 'flex', flexDirection: 'column', color: '#fff' }}>
                        
                        {/* Collection Tag */}
                        <span style={{ textTransform: 'uppercase', color: '#cca3a8', fontWeight: '600', fontSize: '0.85rem', letterSpacing: '2px', marginBottom: '8px' }}>
                            {product.category} collection
                        </span>
                        
                        {/* Product Title Name */}
                        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', margin: '0 0 10px 0', letterSpacing: '0.5px', textTransform: 'capitalize' }}>
                            {product.name}
                        </h1>

                        {/* Price Display */}
                        <div style={{ fontSize: '1.6rem', fontWeight: '700', color: '#fff', marginBottom: '20px' }}>
                            ${Number(product.price).toFixed(2)}
                        </div>

                        {/* Description block */}
                        <p style={{ color: '#cca3a8', lineHeight: '1.6', fontSize: '1rem', margin: '0 0 25px 0', fontWeight: '300' }}>
                            {product.description || `Elevate your signature rotation with this masterfully styled piece from Maroon. Meticulously structured for premium comfort and unmatched aesthetic durability.`}
                        </p>

                        {/* Interactive Size Array (Hidden if product belongs to accents collection) */}
                        {product.category !== 'accents' && (
                            <div style={{ marginBottom: '25px' }}>
                                <span style={{ display: 'block', fontSize: '0.8rem', color: '#cca3a8', marginBottom: '10px', fontWeight: 'bold', letterSpacing: '1px' }}>SELECT SIZE</span>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    {['S', 'M', 'L', 'XL'].map((size) => (
                                        <button 
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            style={{ 
                                                width: '42px', 
                                                height: '42px', 
                                                border: selectedSize === size ? '2px solid #fff' : '1px solid rgba(255,255,255,0.2)', 
                                                backgroundColor: selectedSize === size ? '#5c0615' : 'transparent', 
                                                color: '#fff', 
                                                fontWeight: 'bold', 
                                                borderRadius: '6px', 
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity Counter Block */}
                        <div style={{ marginBottom: '30px' }}>
                            <span style={{ display: 'block', fontSize: '0.8rem', color: '#cca3a8', marginBottom: '10px', fontWeight: 'bold', letterSpacing: '1px' }}>QUANTITY</span>
                            <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '6px', overflow: 'hidden' }}>
                                <button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ background: 'none', border: 'none', color: '#fff', padding: '8px 14px', cursor: 'pointer', fontSize: '1.1rem' }}>-</button>
                                <span style={{ padding: '0 10px', fontWeight: 'bold', minWidth: '20px', textAlign: 'center', fontSize: '0.95rem' }}>{quantity}</span>
                                <button type="button" onClick={() => setQuantity(q => q + 1)} style={{ background: 'none', border: 'none', color: '#fff', padding: '8px 14px', cursor: 'pointer', fontSize: '1.1rem' }}>+</button>
                            </div>
                        </div>

                        {/* Streamlined Add to Bag Call-to-Action Execution Button */}
                        <button 
                            onClick={handleAddToCart}
                            disabled={processing}
                            style={{ 
                                width: '100%', 
                                maxWidth: '350px',
                                padding: '16px', 
                                backgroundColor: '#5c0615', 
                                color: '#fff', 
                                border: 'none', 
                                borderRadius: '8px', 
                                fontSize: '1rem', 
                                fontWeight: 'bold', 
                                cursor: 'pointer', 
                                boxShadow: '0 8px 20px rgba(92, 6, 21, 0.3)', 
                                transition: 'background-color 0.2s ease',
                                opacity: processing ? 0.7 : 1
                            }}
                            onMouseEnter={(e) => { if(!processing) e.currentTarget.style.backgroundColor = '#7a091c'; }}
                            onMouseLeave={(e) => { if(!processing) e.currentTarget.style.backgroundColor = '#5c0615'; }}
                        >
                            {processing ? 'Processing...' : 'Add To Bag'}
                        </button>

                    </div>
                </main>
            </div>
        </>
    );
}