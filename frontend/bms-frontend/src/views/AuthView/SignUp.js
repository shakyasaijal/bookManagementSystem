import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { signUp } from './Components/Validation';
import { signUp as signUpUser } from '../../actions/auth';
import { Redirect } from 'react-router-dom';
import PATHS from '../../routes';


const SignUp = props => {
    const initialState = {
        email: '',
        password: '',
        first_name: '',
        last_name: ''
    }
    const [state, setState] = useState(initialState);
    const [error, setError] = useState(initialState);

    if (props.success) {
        return <Redirect to={PATHS.SIGN_IN} />;
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
        if (name in error) {
            setError({ ...error, [name]: '' })
        }
    }

    const handleSubmit = e => {
        e.preventDefault();
        let validation = signUp(state);
        if (validation.length > 0) {
            let val = {};
            for (let i = 0; i < validation.length; i++) {
                val[validation[i].error] = validation[i].errorValue;
            }
            setError({ ...error, ...val });
        } else {
            // Submit
            props.signUpUser(state);
            setState(initialState);
        }
    }
    return (
        <div className="row">
            <div className="signIn center">
                <div className="page-title">Sign Up</div>
                <div className="signIn-container">
                    <form method="POST" onSubmit={e => handleSubmit(e)}>
                        <div className="form-group">
                            <div className="label">First Name</div>
                            <input type="text" name="first_name" value={state.first_name} onChange={handleChange} className="form-control" autoComplete="off" />
                            {error.first_name && <div className="error">{error.first_name}</div>}
                        </div>
                        <div className="form-group">
                            <div className="label">Last Name</div>
                            <input type="text" name="last_name" value={state.last_name} onChange={handleChange} className="form-control" autoComplete="off" />
                            {error.last_name && <div className="error">{error.last_name}</div>}
                        </div>
                        <div className="form-group">
                            <div className="label">Email</div>
                            <input type="email" name="email" value={state.email} onChange={handleChange} className="form-control" autoComplete="off" />
                            {error.email && <div className="error">{error.email}</div>}
                        </div>
                        <div className="form-group">
                            <div className="label">Password</div>
                            <input type="password" name="password" value={state.password} onChange={handleChange} className="form-control" autoComplete="off" />
                            {error.password && <div className="error">{error.password}</div>}
                        </div>
                        <div className="form-group">
                            <button type="submit" className="submit">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}


const mapStateToProps = state => ({
    success: state.auth.success,
    error: state.auth.error
});

export default connect(mapStateToProps, { signUpUser })(SignUp);
