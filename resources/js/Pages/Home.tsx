import { Head } from '@inertiajs/react';
import '../../css/home.css';

export default function Home() {
    return (
        <>
            <Head title="Home - Maroon" />
            
            <div className="home-wrapper">
                <main className="main-card">
                    
                    {/* Left Half: Brand Identity */}
                    <div className="brand-section">
                        <span className="brand-subtitle">The Maroon Shades</span>
                        <h1 className="brand-title">MAROON</h1>
                        
                        <nav className="inline-nav">
                            <a href="/home">Home</a>
                            <a href="/shop">Shop</a>
                            <a href="/accents">Accents</a>
                            <a href="/contact">Contact</a>
                        </nav>
                        
                        <p className="brand-tagline">
                            "Every shade, every style, as long as it's Maroon."
                        </p>
                    </div>

                    {/* Right Half: Interactive Forms */}
                    <div className="action-section">
                        
                        {/* Search Bar */}
                        <div className="search-container">
                            <input 
                                type="text" 
                                placeholder="Search apparel..." 
                                className="search-input" 
                            />
                            <button className="search-button">Search</button>
                        </div>

                        {/* Login & Registration Portal */}
                        <div className="auth-buttons-container">
                            <a href="/login" className="btn-login">
                                Log In to Your Account
                            </a>
                            
                            <span className="auth-divider">New to Maroon?</span>
                            
                            <a href="/register" className="btn-register">
                                Register Here
                            </a>
                        </div>

                        {/* Footer Media Links */}
                        <div className="social-footer">
                            <p className="social-text">Connect with us:</p>
                            <div className="social-icons">
                                {/* Simple text stand-ins or font icons can replace these */}
                                <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>f</span>
                                <span style={{ cursor: 'pointer', fontWeight: 'bold', marginLeft: '10px' }}>📸</span>
                            </div>
                        </div>

                    </div>

                </main>
            </div>
        </>
    );
}