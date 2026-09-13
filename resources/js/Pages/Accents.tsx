import { Head, Link } from '@inertiajs/react';
import '../../css/shop.css'; // Reusing your premium grid card stylesheet rules

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    price: number;
    stock_quantity: number;
    image_path: string | null;
    category: string;
}

interface AccentsProps {
    products: Product[];
}

export default function Accents({ products }: AccentsProps) {
    return (
        <>
            <Head title="Accents - Maroon" />
            
            <div className="shop-container">
                
                {/* Header Navigation with Logo flipped to the Right side as per your mockup */}
                <header className="shop-header">
                    <nav className="shop-nav">
                        <Link href="/">Home</Link>
                        <Link href="/shop">Shop</Link>
                        <Link href="/accents" className="active">Accents</Link>
                        <Link href="/contact">Contact</Link>
                    </nav>
                    <div className="shop-logo">MAROON</div>
                </header>

                {/* "Complete The Look" Middle Intro Card */}
                <div style={{ textAlign: 'center', padding: '40px 20px 10px 20px' }}>
                    <div style={{
                        display: 'inline-block',
                        backgroundColor: '#fff',
                        color: '#5c0615',
                        fontSize: '2.2rem',
                        fontWeight: '900',
                        padding: '12px 40px',
                        borderRadius: '12px',
                        marginBottom: '15px',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.3)'
                    }}>
                        Complete The Look
                    </div>
                    <p style={{ color: '#cca3a8', fontSize: '1.05rem', margin: '0', letterSpacing: '0.5px' }}>
                        Premium maroon details curated to elevate your essential wardrobe pairings.
                    </p>
                </div>

                {/* Dynamic Accents Product Grid */}
                <main className="product-grid" style={{ paddingTop: '30px' }}>
                    {products.length === 0 ? (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#cca3a8' }}>
                            <p>No accents items found. Add items with the category "accents" in the admin panel!</p>
                        </div>
                    ) : (
                        products.map(product => (
                            <Link 
                                href={`/products/${product.id}`} 
                                key={product.id} 
                                className="product-card" 
                                style={{ textDecoration: 'none' }}
                            >
                                {/* Background Asset Image */}
                                {product.image_path ? (
                                    <img 
                                        src={`/storage/${product.image_path}`} 
                                        alt={product.name} 
                                        className="product-image"
                                    />
                                ) : (
                                    <div className="no-image-placeholder">
                                        <span>No Image Available</span>
                                    </div>
                                )}

                                {/* Bottom Info Text Overlay */}
                                <div className="product-overlay">
                                    <h3 className="product-title">{product.name}</h3>
                                    <span className="product-price">
                                        ${Number(product.price).toFixed(2)}
                                    </span>
                                </div>
                            </Link>
                        ))
                    )}
                </main>
            </div>
        </>
    );
}