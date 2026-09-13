import { FormEvent } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import '../../../css/auth.css';

export default function Login() {
    // Breeze's authentication processing form hook
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Sign In - Maroon" />

            <div className="auth-wrapper">
                <div className="auth-card">
                    
                    {/* Left Half: Image Collage & Brand Hook */}
                    <div className="auth-image-side">
                        {/* If your layout image is a single file compiled in public/images/login-collage.jpg */}
                        <Link href="/" className="btn-back-home">
                            <span>←</span> Home
                        </Link>
                        
                        <div className="auth-image-overlay"></div>
                        
                        <div className="auth-image-text-box">
                            <h2 className="auth-image-box-title">Welcome Back</h2>
                            <p className="auth-image-box-tagline">
                                "Every shade, every style, as long as it's Maroon."
                            </p>
                        </div>
                    </div>

                    {/* Right Half: Live Authentic Login Form */}
                    <div className="auth-form-side">
                        <h1 className="auth-brand-logo">MAROON</h1>
                        <p className="auth-form-subtitle">Sign In to Your Account</p>

                        <form onSubmit={submit}>
                            {/* Email Field */}
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

                            {/* Password Field */}
                            <div className="form-group">
                                <div className="form-label-row">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <Link href={route('password.request')} className="form-link-forgot">
                                        Forgot?
                                    </Link>
                                </div>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="auth-input-field"
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                {errors.password && <span className="input-error-msg">{errors.password}</span>}
                            </div>

                            {/* Sign In Trigger */}
                            <button className="btn-auth-submit" disabled={processing}>
                                {processing ? 'Signing In...' : 'Sign In'}
                            </button>

                            {/* Register Toggle Link */}
                            <p className="auth-footer-redirect">
                                New to Maroon? <Link href={route('register')}>Create an account</Link>
                            </p>
                        </form>
                    </div>

                </div>
            </div>
        </>
    );
}