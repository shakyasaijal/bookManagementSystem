import React from 'react';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import PATHS from '../routes';
import { logout } from '../actions/auth';


const MobileNavbar = props => {
    const dispatch = useDispatch();

    return (
        <div className="mobile-nav text-center">
            {
                props.isAuthenticated ? <>
                    <div className="option">
                        <span onClick={() => dispatch(logout())} className="logout-btn">Logout</span>
                    </div>
                    <div className="option">
                        <Link to={PATHS.ADD_BOOK}>Add book</Link>
                    </div>
                </> : <>
                        <div className="option">
                            <Link to={PATHS.SIGN_IN} className="nav">Sign In</Link>
                        </div>
                        <div className="option">
                            <Link to={PATHS.SIGN_UP} className="nav">Sign Up</Link>
                        </div>


                    </>
            }

            <div className="option">
                <Link to={PATHS.HOME}>Home</Link>
            </div>
            <div className="option">
                <Link to={PATHS.SEARCH}>Search</Link>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(MobileNavbar);
