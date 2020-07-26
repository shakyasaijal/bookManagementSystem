import React from 'react';
import { Link } from 'react-router-dom';
import PATHS from '../routes';


const Header = () => {
    const login = true;
    return (
        <header className="header">
            <div className="navbar verticle-align">
                <div className="logo">BMS</div>
                <div className="navs center">
                    <Link to={PATHS.HOME} className="nav">Home</Link>
                    <Link to={PATHS.SEARCH} className="nav">Search</Link>
                    {
                        login ? <Link to={PATHS.ADD_BOOK} className="nav">Add Book</Link> : <>
                            <Link to={PATHS.SIGN_IN} className="nav">Sign In</Link>
                            <Link to={PATHS.SIGN_UP} className="nav">Sign Up</Link>
                        </>
                    }
                </div>
            </div>
        </header>
    );
}

export default Header;
