import { FormEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import '../../../css/auth.css';

export default function Register() {
    // Breeze's account creation form engine
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '', // Laravel requires this match check under the hood
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        
        // Before sending, we auto-duplicate password into password_confirmation 
        // to keep your UI clean with only 1 password field!
        data.password_confirmation = data.password;

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Create Account - Maroon" />

            <div className="auth-wrapper">
                <div className="auth-card">
                    
                    {/* Left Half: Casual Chic Registration Image */}
                    <div className="auth-image-side register-bg">
                        <Link href="/" className="btn-back-home">
                            <span>←</span> Home
                        </Link>
                        
                        <div className="auth-image-overlay"></div>
                        
                        <div className="auth-image-text-box">
                            <h2 className="auth-image-box-title">The Maroon Shades</h2>
                            <p className="auth-image-box-tagline">
                                "Every shade, every style, as long as it's Maroon."
                            </p>
                        </div>
                    </div>

                    {/* Right Half: Live Functional Registration Form */}
                    <div className="auth-form-side">
                        <h1 className="auth-brand-logo">MAROON</h1>
                        <p className="auth-form-subtitle">Create Your Premium Account</p>

                        <form onSubmit={submit}>
                            {/* Full Name Field */}
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Full Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="auth-input-field"
                                    placeholder="John Doe"
                                    autoComplete="name"
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                {errors.name && <span className="input-error-msg">{errors.name}</span>}
                            </div>

                            {/* Email Address Field */}
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email Address</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="auth-input-field"
                                    placeholder="name@example.com"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                {errors.email && <span className="input-error-msg">{errors.email}</span>}
                            </div>

                            {/* Create Password Field */}
                            <div className="form-group">
                                <label htmlFor="password" className="form-label">Create Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="auth-input-field"
                                    placeholder="Min. 8 characters"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                {errors.password && <span className="input-error-msg">{errors.password}</span>}
                            </div>

                            {/* Terms and Privacy Checkbox */}
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', margin: '20px 0 10px 0' }}>
                                <input type="checkbox" id="terms" required style={{ accentColor: '#5c0615' }} />
                                <label htmlFor="terms" style={{ fontSize: '0.85rem', color: '#555' }}>
                                    I agree to the <span style={{ color: 'blue', cursor: 'pointer' }}>Terms of Service</span> & <span style={{ color: 'blue', cursor: 'pointer' }}>Privacy Policy</span>
                                </label>
                            </div>

                            {/* Submit Registration Action */}
                            <button className="btn-auth-submit" disabled={processing}>
                                {processing ? 'Creating Account...' : 'Create Account'}
                            </button>

                            {/* Redirect back to Login */}
                            <p className="auth-footer-redirect">
                                Already have an account? <Link href={route('login')}>Sign In</Link>
                            </p>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );
}