import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


import PATHS from '../routes';

const AuthContainer = (props) => {
    const { children } = props;

    const isLoggedIn = false;

    if (!isLoggedIn) {
        return <Redirect push to={PATHS.SIGN_IN} />;
    }

    return <div>{children}</div>;
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: isLoggedIn(state),
    };
};

export default connect(mapStateToProps, {})(AuthContainer);
