import React from 'react';
import { Link } from 'react-router-dom';

const MobileNavbar = () => {
    return (
        <div className="mobile-nav text-center">
            <div className="option">
                <Link to='/'>Logout</Link>
            </div>
            <div className="option">
                <Link to='/'>Home</Link>
            </div>
            <div className="option">
                <Link to='/'>Add book</Link>
            </div>
            <div className="option">
                <Link to='/'>Search</Link>
            </div>
        </div>
    );
}

export default MobileNavbar;