import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <div className="navbar verticle-align">
                <div className="logo">BMS</div>
                <div className="navs center">
                    <Link to='/' className="nav">Home</Link>
                    <Link to='/' className="nav">Search</Link>
                    <Link to='/' className="nav">Sign In</Link>
                    <Link to='/' className="nav">Sign Up</Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
