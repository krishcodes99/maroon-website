import { Head } from '@inertiajs/react';

// Defining the TypeScript types for the props coming from Laravel
interface MaroonHomeProps {
    projectName: string;
    version: string;
}

export default function MaroonHome({ projectName, version }: MaroonHomeProps) {
    return (
        <>
            <Head title="Welcome to Maroon" />
            
            <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '100vh', 
                backgroundColor: '#1a1a1a', 
                color: '#fff',
                fontFamily: 'sans-serif' 
            }}>
                <div style={{ 
                    textAlign: 'center', 
                    padding: '40px', 
                    borderRadius: '12px', 
                    backgroundColor: '#2a2a2a',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                    borderTop: '5px solid #800000' // Maroon color accent
                }}>
                    <h1 style={{ color: '#b03030', fontSize: '3rem', margin: '0 0 10px 0' }}>
                        {projectName}
                    </h1>
                    <p style={{ color: '#aaa', fontSize: '1.2rem' }}>
                        Your Full-Stack TypeScript Application is Live!
                    </p>
                    <hr style={{ borderColor: '#444', margin: '20px 0' }} />
                    <p style={{ fontSize: '0.9rem', color: '#888' }}>
                        Version: <span style={{ color: '#b03030', fontWeight: 'bold' }}>{version}</span>
                    </p>
                </div>
            </div>
        </>
    );
}