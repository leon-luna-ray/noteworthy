import React, { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import IconMenu from '@/components/icons/IconMenu';

const Header = () => {
    const { logOut, isLoggedIn, user } = useAuth();
    const location = useLocation();

    const isNoteView = useMemo(() => location.pathname.includes('/notes/'), [location.pathname]);

    return (
        <header className={`${isNoteView ? 'full-bleed' : ''} 'note absolute top-0 w-full py-[2rem] flex items-center z-[2]`}>
            <div className="container flex justify-between items-center">
                {location.pathname === '/welcome' ? (<div aria-hidden="true"></div>) : (
                    <Link to="/welcome" className='logo'>
                        <span className='h3'>Noteworthy</span>
                    </Link>
                )}
                <div className="flex items-center gap-x-[2rem]">
                    <div className="flex gap-x-[0.75rem] items-center">
                        {isLoggedIn && <p className='text-[0.875rem] lg:text-[1rem]'>{user.email}</p>}
                        <IconMenu />
                    </div>
                    <nav className="hidden lg:flex gap-[1rem] items-center">
                        {isLoggedIn && <Link to="/">Dashboard</Link>}
                        {isLoggedIn ? <button onClick={logOut}>Log out</button> : <Link to="/login">Login</Link>}
                    </nav>
                </div>
            </div >
        </header >
    )
}

export default Header;
