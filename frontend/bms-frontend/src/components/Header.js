import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PATHS from '../routes';
import { logout } from '../actions/auth';
import { clearNotification } from '../actions/notification';


const Header = (props) => {
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.auth);
    return (
        <header className="header">
            <div className="navbar verticle-align">
                <div className="logo">BMS</div>
                <div className="navs center">
                    <Link to={PATHS.HOME} className="nav">Home</Link>
                    <Link to={PATHS.SEARCH} className="nav">Search</Link>
                    {
                        isAuth.isAuthenticated ? <><Link to={PATHS.ADD_BOOK} className="nav">Add Book</Link><span onClick={() => { dispatch(logout()); }} className="nav logout-btn">Logout</span></> : <>
                            <Link to={PATHS.SIGN_IN} className="nav">Sign In</Link>
                            <Link to={PATHS.SIGN_UP} className="nav">Sign Up</Link>
                        </>
                    }
                </div>
            </div>
        </header>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.auth.errorLOAD_ERROR
});

export default connect(mapStateToProps, {clearNotification})(Header);
