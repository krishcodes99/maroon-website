import { Head, Link } from '@inertiajs/react';
import '../../css/shop.css'; // <-- Import your separate CSS file here!

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

interface ShopProps {
    products: Product[];
}

export default function Shop({ products }: ShopProps) {
    return (
        <>
            <Head title="Shop - Maroon" />
            
            <div className="shop-container">
                
                {/* Header Navigation */}
                <header className="shop-header">
                    <div className="shop-logo">MAROON</div>
                    <nav className="shop-nav">
                        <a href="/">Home</a>
                        <a href="/shop" className="active">Shop</a>
                        <a href="/accents">Accents</a>
                        <a href="/contact">Contact</a>
                    </nav>
                </header>

                {/* Product Grid */}
                <main className="product-grid">
                    {products.map(product => (
                        <Link 
                            href={`/products/${product.id}`} 
                            key={product.id} 
                            className="product-card"
                            style={{ textDecoration: 'none' }}
                        >
                            {/* Background Image */}
                            {product.image_path ? (
                                <img 
                                    src={`/storage/${product.image_path}`} 
                                    alt={product.name} 
                                    className="product-image"
                                />
                            ) : (
                                <div className="no-image-placeholder">
                                    <span>No Image</span>
                                </div>
                            )}

                            {/* Text Overlay */}
                            <div className="product-overlay">
                                <h3 className="product-title">{product.name}</h3>
                                <span className="product-price">
                                    ${Number(product.price).toFixed(2)}
                                </span>
                            </div>
                        </Link>
                    ))}
                </main>
            </div>
        </>
    );
}