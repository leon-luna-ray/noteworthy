import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Hero = () => {
    const { isLoggedIn } = useAuth();

    return (
        <section>
            <div className="container flex flex-col gap-y-[6rem] justify-center items-center">
                <div className="flex-col-1 justify-center items-center">
                    <h1>Noteworthy</h1>
                    <p className='text-[1.25rem]'>An app for keeping simple notes.</p>
                </div>
                <div className="flex gap-[1rem]">
                    {isLoggedIn ? <Link to="/" className='btn'>Go to Dashboard</Link> :
                        <>
                            <Link to="/login" className="btn">Login</Link>
                            <Link to="/signup" className="btn">Singup</Link>
                        </>
                    }
                </div>
            </div>
        </section>
    )
}

export default Hero;